Schema = GraphQL::Schema.define do
  use Subscriptions::ActionCableSubscriptions

  query Types::QueryType
  mutation Mutations::MutationType
  subscription Types::SubscriptionType

  id_from_object ->(object, type_definition, query_ctx) {
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  }

  object_from_id ->(id, query_ctx) {
    type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
    if query_ctx[:scope]
      object = query_ctx[:scope].find(item_id)
      thorw "#{object} is not a #{type_name}" if object.class.name != type_name
      object
    else
      type_name.constantize.find(item_id)
    end
  }

  resolve_type ->(obj, ctx) {
    "Types::#{obj.class}Type".constantize
  }
end
