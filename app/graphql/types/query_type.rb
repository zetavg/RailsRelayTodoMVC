Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :node, GraphQL::Relay::Node.field

  field :viewer, Types::UserType do
    resolve ->(obj, args, ctx) {
      ctx[:current_user]
    }
  end
end
