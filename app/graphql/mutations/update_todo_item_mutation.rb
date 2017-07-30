Mutations::UpdateTodoItemMutation = GraphQL::Relay::Mutation.define do
  name "UpdateTodoItem"

  input_field :todoItemID, !types.ID
  input_field :name, types.String
  input_field :completed, types.Boolean

  return_field :todoItem, !Types::TodoItemType
  return_field :todoList, !Types::TodoListType

  resolve ->(object, inputs, ctx) {
    todo_item = Schema.object_from_id(inputs[:todoItemID], scope: ctx[:current_user].todo_items)
    throw "cannot find TodoItem with id: #{inputs[:todoListID]}" unless todo_item

    todo_item.name = inputs[:name] unless inputs[:name].nil?
    todo_item.completed = inputs[:completed] unless inputs[:completed].nil?
    todo_item.save!

    {
      todoItem: todo_item,
      todoList: todo_item.todo_list
    }
  }
end
