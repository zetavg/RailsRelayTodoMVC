Mutations::AddTodoItemMutation = GraphQL::Relay::Mutation.define do
  name "AddTodoItem"

  input_field :todoListID, !types.ID
  input_field :name, !types.String
  input_field :completed, types.Boolean

  return_field :todoItem, !Types::TodoItemType
  return_field :todoListTodoItemsConnectionEdge, !Types::TodoItemType.edge_type
  return_field :todoList, !Types::TodoListType

  resolve ->(object, inputs, ctx) {
    todo_list = Schema.object_from_id(inputs[:todoListID], scope: ctx[:current_user].todo_lists)
    throw "cannot find TodoList with id: #{inputs[:todoListID]}" unless todo_list
    new_todo_item = todo_list.todo_items.build
    new_todo_item.assign_attributes(name: inputs[:name])
    new_todo_item.completed = inputs[:completed] unless inputs[:completed].nil?
    new_todo_item.save!

    todo_list_todo_items_range_add = GraphQL::Relay::RangeAdd.new(
      collection: todo_list.todo_items,
      item: new_todo_item
    )

    {
      todoItem: new_todo_item,
      todoListTodoItemsConnectionEdge: todo_list_todo_items_range_add.edge,
      todoList: todo_list
    }
  }
end
