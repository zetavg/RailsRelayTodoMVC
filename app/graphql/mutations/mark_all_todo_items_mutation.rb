Mutations::MarkAllTodoItemsMutation = GraphQL::Relay::Mutation.define do
  name "MarkAllTodoItems"

  input_field :todoListID, !types.ID
  input_field :completed, !types.Boolean

  return_field :changedTodoItems, !types[Types::TodoItemType]
  return_field :todoList, !Types::TodoListType

  resolve ->(object, inputs, ctx) {
    todo_list = Schema.object_from_id(inputs[:todoListID], scope: ctx[:current_user].todo_lists)
    throw "cannot find TodoList with id: #{inputs[:todoListID]}" unless todo_list

    form = TodoList::AllTodoItemsMark.new(todo_list: todo_list, completed: inputs[:completed])
    form.save!

    {
      changedTodoItems: form.todo_items,
      todoList: form.todo_list
    }
  }
end
