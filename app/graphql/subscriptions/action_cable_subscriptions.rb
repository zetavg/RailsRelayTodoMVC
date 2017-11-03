module Subscriptions
  class ActionCableSubscriptions < GraphQL::Subscriptions
    SUBSCRIPTION_PREFIX = 'graphql-subscription:'.freeze
    EVENT_PREFIX = 'graphql-event:'.freeze

    def initialize(**rest)
      # A per-process map of subscriptions to deliver.
      # This is provided by Rails, so let's use it
      @subscriptions = Concurrent::Map.new
      super
    end

    # An event was triggered; Push the data over ActionCable.
    # Subscribers will re-evaluate locally.
    def execute_all(event, object)
      stream = "#{EVENT_PREFIX}#{event.topic}"

      # message = case object
      #           when Hash
      #             Hash[object.map do |k, v|
      #               v = case v
      #                   when Array
      #                     v.map { |i| Serialize.dump(i) }
      #                   else
      #                     Serialize.dump(v)
      #                   end
      #               [k, v]
      #             end]
      #           else
      #             Serialize.dump(object)
      #           end
      message = Base64.encode64(Marshal.dump(object))

      ActionCable.server.broadcast(stream, message, coder: ActiveSupport::JSON)
    end

    # This subscription was re-evaluated.
    # Send it to the specific stream where this client was waiting.
    def deliver(subscription_id, result)
      payload = { result: result.to_h, more: true }
      # subscription = read_subscription(subscription_id)
      # action_cable_channel = subscription[:context][:action_cable_channel]
      # action_cable_channel.transmit(payload)
      ActionCable.server.broadcast("#{SUBSCRIPTION_PREFIX}#{subscription_id}", payload)
    end

    # A query was run where these events were subscribed to.
    # Store them in memory in _this_ ActionCable frontend.
    # It will receive notifications when events come in
    # and re-evaluate the query locally.
    def write_subscription(query, events)
      # Generate an id for the subscription and store it
      subscription_id = SecureRandom.uuid
      @subscriptions[subscription_id] = query

      # Let the action_cable_channel stream_from the specific events that will fire
      # later by execute_all
      action_cable_channel = query.context[:action_cable_channel]
      events.each do |event|
        # stream_from events that will be brodcasting from execute_all
        action_cable_channel.stream_from("#{EVENT_PREFIX}#{event.topic}", coder: ActiveSupport::JSON) do |message|
          # object = case message
          #          when Hash
          #            message_hash = Hash[message.map do |k, v|
          #              v = case v
          #                  when Array
          #                    v.map { |i| Serialize.load(i) }
          #                  else
          #                    Serialize.load(v)
          #                  end
          #              [k, v]
          #            end]
          #            OpenStruct.new(message_hash)
          #          else
          #            Serialize.load(message)
          #          end
          object = Marshal.load(Base64.decode64(message))
          object = OpenStruct.new(object) if object.is_a? Hash

          execute(subscription_id, event, object)
        end
      end

      # Let the action_cable_channel stream_from its own delivery
      action_cable_channel.stream_from("#{SUBSCRIPTION_PREFIX}#{subscription_id}")
    end

    # Return the query from "storage" (in memory)
    def read_subscription(subscription_id)
      query = @subscriptions[subscription_id]
      {
        query_string: query.query_string,
        variables: query.provided_variables,
        context: query.context.to_h,
        operation_name: query.operation_name
      }
    end

    # The channel was closed, forget about it.
    def delete_subscription(subscription_id)
      @subscriptions.delete(subscription_id)
    end
  end
end
