Types::UserType = GraphQL::ObjectType.define do
  name "User"
  implements GraphQL::Relay::Node.interface
  global_id_field :id

  field :name, !types.String
  field :todoList, Types::TodoListType, property: :todo_list
end
