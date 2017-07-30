Mutations::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :addTodoItem, field: Mutations::AddTodoItemMutation.field
  field :updateTodoItem, field: Mutations::UpdateTodoItemMutation.field
  field :removeTodoItem, field: Mutations::RemoveTodoItemMutation.field
  field :markAllTodoItems, field: Mutations::MarkAllTodoItemsMutation.field
  field :clearCompletedTodoItems, field: Mutations::ClearCompletedTodoItemsMutation.field
end
