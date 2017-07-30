Types::TodoListType = GraphQL::ObjectType.define do
  name "TodoList"
  implements GraphQL::Relay::Node.interface
  global_id_field :id

  field :name, !types.String
  connection :todoItems, Types::TodoItemType.connection_type, property: :todo_items
  field :user, !Types::UserType
  field :todoItemsCount, types.Int, property: :todo_items_count
  field :activeTodoItemsCount, types.Int, property: :active_todo_items_count
  field :completedTodoItemsCount, types.Int, property: :completed_todo_items_count
end
