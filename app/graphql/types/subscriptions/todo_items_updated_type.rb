Types::Subscriptions::TodoItemsUpdatedType = GraphQL::ObjectType.define do
  name "TodoItemsUpdated"

  field :updatedTodoItems, !types[Types::TodoItemType], property: :updated_todo_items
  field :todoList, !Types::TodoListType, property: :todo_list
end
