Types::Subscriptions::TodoItemsRemovedType = GraphQL::ObjectType.define do
  name "TodoItemsRemoved"

  field :removedTodoItemIDs, !types[types.ID], property: :removed_todo_item_ids
  field :todoList, !Types::TodoListType, property: :todo_list
end
