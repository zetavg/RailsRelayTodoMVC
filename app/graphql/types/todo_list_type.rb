Types::TodoListType = GraphQL::ObjectType.define do
  name "TodoList"
  implements GraphQL::Relay::Node.interface
  global_id_field :id

  field :name, !types.String

  connection :todoItems, Types::TodoItemType.connection_type do
    argument :filter, (GraphQL::EnumType.define do
      name "TodoListTodoItemsFilterEnum"
      value :all
      value :active
      value :completed
    end)

    resolve ->(obj, args, ctx) {
      todo_items = obj.todo_items.reorder(created_at: :asc)

      case args[:filter].to_sym
      when :active
        todo_items.active
      when :completed
        todo_items.completed
      else
        todo_items
      end
    }
  end

  field :user, !Types::UserType
  field :todoItemsCount, types.Int, property: :todo_items_count
  field :activeTodoItemsCount, types.Int, property: :active_todo_items_count
  field :completedTodoItemsCount, types.Int, property: :completed_todo_items_count
end
