Types::Subscriptions::TodoItemRemovedType = GraphQL::ObjectType.define do
  name "TodoItemRemoved"

  field :removedTodoItemID, !types.ID, property: :removed_todo_item_id
  field :todoList, !Types::TodoListType, property: :todo_list
end
