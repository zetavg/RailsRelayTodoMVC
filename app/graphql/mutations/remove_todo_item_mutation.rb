Mutations::RemoveTodoItemMutation = GraphQL::Relay::Mutation.define do
  name "RemoveTodoItem"

  input_field :todoItemID, !types.ID

  return_field :removedTodoItem, !Types::TodoItemType
  return_field :todoList, !Types::TodoListType

  resolve ->(object, inputs, ctx) {
    todo_item = Schema.object_from_id(inputs[:todoItemID], scope: ctx[:current_user].todo_items)
    throw "cannot find TodoItem with id: #{inputs[:todoListID]}" unless todo_item

    form = TodoItem::Removal.new(todo_item: todo_item)
    form.save!

    {
      removedTodoItem: form.todo_item,
      todoList: form.todo_list
    }
  }
end
