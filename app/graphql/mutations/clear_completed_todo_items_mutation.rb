Mutations::ClearCompletedTodoItemsMutation = GraphQL::Relay::Mutation.define do
  name "ClearCompletedTodoItems"

  input_field :todoListID, !types.ID

  return_field :removedTodoItems, !types[Types::TodoItemType]
  return_field :todoList, !Types::TodoListType

  resolve ->(object, inputs, ctx) {
    todo_list = Schema.object_from_id(inputs[:todoListID], scope: ctx[:current_user].todo_lists)
    throw "cannot find TodoList with id: #{inputs[:todoListID]}" unless todo_list

    form = TodoList::CompletedTodoItemsClearness.new(todo_list: todo_list)
    form.save!

    {
      removedTodoItems: form.removed_todo_items,
      todoList: form.todo_list
    }
  }
end
