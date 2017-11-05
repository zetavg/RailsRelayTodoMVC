Mutations::RemoveTodoItemMutation = GraphQL::Relay::Mutation.define do
  name "RemoveTodoItem"

  input_field :todoListID, types.ID
  input_field :todoItemID, !types.ID

  return_field :removedTodoItem, !Types::TodoItemType
  return_field :todoList, !Types::TodoListType

  resolve ->(object, inputs, ctx) {
    if inputs[:todoListID]
      todo_list = Schema.object_from_id(inputs[:todoListID], scope: ctx[:current_user].todo_lists)
      throw "cannot find TodoList with id: #{inputs[:todoListID]}" unless todo_list
      todo_item = Schema.object_from_id(inputs[:todoItemID], scope: todo_list.todo_items)
    else
      todo_item = Schema.object_from_id(inputs[:todoItemID], scope: ctx[:current_user].todo_items)
    end
    throw "cannot find TodoItem with id: #{inputs[:todoItemID]}" unless todo_item

    form = TodoItem::Removal.new(todo_item: todo_item)
    form.save!

    {
      removedTodoItem: form.todo_item,
      todoList: form.todo_list
    }
  }
end
