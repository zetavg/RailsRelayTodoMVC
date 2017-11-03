Types::SubscriptionType = GraphQL::ObjectType.define do
  name "Subscription"

  field :todoItemAdded, !Types::Subscriptions::TodoItemAddedType, "A todo item was added to the todo list" do
    argument :todoListID, !types.ID
  end

  field :todoItemUpdated, !Types::Subscriptions::TodoItemUpdatedType, "A todo item in the todo list was updated" do
    argument :todoListID, !types.ID
  end

  field :todoItemsUpdated, !Types::Subscriptions::TodoItemsUpdatedType, "Some todo items in the todo list was updated" do
    argument :todoListID, !types.ID
  end

  field :todoItemRemoved, !Types::Subscriptions::TodoItemRemovedType, "A todo item in the todo list was removed" do
    argument :todoListID, !types.ID
  end

  field :todoItemsRemoved, !Types::Subscriptions::TodoItemsRemovedType, "Some todo items in the todo list was removed" do
    argument :todoListID, !types.ID
  end
end
