Interfaces::TodoListsHolderInterface = GraphQL::InterfaceType.define do
  name "TodoListsHolder"

  field :todoList, Types::TodoListType do
    argument :id, types.ID
  end
  connection :todoLists, Types::TodoListType.connection_type
end
