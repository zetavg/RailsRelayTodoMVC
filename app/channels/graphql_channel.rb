class GraphQLChannel < ApplicationCable::Channel
  include ParamsHelper
  attr_reader :subscription_id

  def subscribed
    @subscription_id = params['subscriptionID'] || SecureRandom.uuid
    @graphql_subscription_ids = []
  end

  def execute(params)
    query = params['query']
    variables = ensure_hash(params['variables'])
    operation_name = params['operationName']
    context = {
      current_user: current_user,
      action_cable_channel: self
    }

    result = Schema.execute(
      query: query,
      operation_name: operation_name,
      variables: variables,
      context: context
    )

    payload = {
      result: result.to_h,
      more: result.subscription?
    }

    # Track the subscription here so we can remove it
    # on unsubscribe.
    if result.context[:subscription_id]
      @graphql_subscription_ids << context[:subscription_id]
    end

    transmit(payload)
  end

  def unsubscribed
    @graphql_subscription_ids.each { |sid| Schema.subscriptions.delete_subscription(sid) }
  end

  private

  def current_user
    User.last
  end
end
