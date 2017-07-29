Types::TodoListType = GraphQL::ObjectType.define do
  name "TodoList"
  implements GraphQL::Relay::Node.interface
  global_id_field :id

  field :name, !types.String
  connection :todoItems, Types::TodoItemType.connection_type, property: :todo_items
  field :user, !Types::UserType
end
