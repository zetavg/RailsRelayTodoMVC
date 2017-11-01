Types::UserType = GraphQL::ObjectType.define do
  name "User"
  implements GraphQL::Relay::Node.interface
  global_id_field :id

  field :name, !types.String

  implements Interfaces::TodoListsHolderInterface

  field :todoList, Types::TodoListType do
    argument :id, types.ID
    resolve ->(obj, args, ctx) {
      if args[:id].present? && args[:id] != 'default'
        Schema.object_from_id(args[:id], scope: obj.todo_lists)
      else
        obj.todo_lists.first
      end
    }
  end

  connection :todoLists, Types::TodoListType.connection_type, property: :todo_lists
end
