Types::Subscriptions::TodoItemUpdatedType = GraphQL::ObjectType.define do
  name "TodoItemUpdated"

  field :todoItem, !Types::TodoItemType, property: :todo_item
  field :todoList, !Types::TodoListType, property: :todo_list
end
