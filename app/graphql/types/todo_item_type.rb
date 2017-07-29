Types::TodoItemType = GraphQL::ObjectType.define do
  name "TodoItem"
  implements GraphQL::Relay::Node.interface
  global_id_field :id

  field :completed, !types.Boolean
  field :name, !types.String
  field :todoList, !Types::TodoListType, property: :todo_list
end
