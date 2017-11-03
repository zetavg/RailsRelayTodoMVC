Types::Subscriptions::TodoItemAddedType = GraphQL::ObjectType.define do
  name "TodoItemAdded"

  field :todoItem, !Types::TodoItemType, property: :todo_item
  field :todoList, !Types::TodoListType, property: :todo_list
  # field :todoListTodoItemsConnectionEdge, !Types::TodoItemType.edge_type, property: :todo_list_todo_items_connection_edge
end
