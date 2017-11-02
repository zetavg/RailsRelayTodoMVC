class GraphQLObserver < ActiveRecord::Observer
  observe 'todo_item',
          'todo_item/removal',
          'todo_list/all_todo_items_mark',
          'todo_list/completed_todo_items_clearness'

  def after_create(record)
    case record
    when TodoItem
      todo_item = record
      todo_list = todo_item.todo_list
      todo_list_gid = Schema.id_from_object(todo_list, Schema.resolve_type(todo_list, nil), nil)

      payload = {
        todo_item: todo_item,
        todo_list: todo_list,
        # todo_list_todo_items_connection_edge: GraphQL::Relay::RangeAdd.new(
        #   collection: todo_list.todo_items,
        #   item: todo_item
        # ).edge
      }

      Schema.subscriptions.trigger('todoItemAdded', { todoListID: todo_list_gid }, payload)
    end
  end

  def after_save(record)
    case record
    when TodoItem
      return if record.saved_change_to_attribute? :created_at

      todo_item = record
      todo_list = todo_item.todo_list
      todo_list_gid = Schema.id_from_object(todo_list, Schema.resolve_type(todo_list, nil), nil)

      payload = {
        todo_item: todo_item,
        todo_list: todo_list
      }

      Schema.subscriptions.trigger('todoItemUpdated', { todoListID: todo_list_gid }, payload)
    when TodoItem::Removal
      todo_item = record.todo_item
      todo_list = todo_item.todo_list
      todo_list_gid = Schema.id_from_object(todo_list, Schema.resolve_type(todo_list, nil), nil)

      payload = {
        removed_todo_item_id: Schema.id_from_object(todo_item, Schema.resolve_type(todo_item, nil), nil),
        todo_list: todo_list
      }

      Schema.subscriptions.trigger('todoItemRemoved', { todoListID: todo_list_gid }, payload)
    when TodoList::AllTodoItemsMark
      todo_items = record.changed_todo_items
      todo_list = record.todo_list
      todo_list_gid = Schema.id_from_object(todo_list, Schema.resolve_type(todo_list, nil), nil)

      payload = {
        updated_todo_items: todo_items.to_ary,
        todo_list: todo_list
      }

      Schema.subscriptions.trigger('todoItemsUpdated', { todoListID: todo_list_gid }, payload)
    when TodoList::CompletedTodoItemsClearness
      todo_items = record.removed_todo_items
      todo_list = record.todo_list
      todo_list_gid = Schema.id_from_object(todo_list, Schema.resolve_type(todo_list, nil), nil)

      payload = {
        removed_todo_item_ids: todo_items.map { |i| Schema.id_from_object(i, Schema.resolve_type(i, nil), nil) },
        todo_list: todo_list
      }

      Schema.subscriptions.trigger('todoItemsRemoved', { todoListID: todo_list_gid }, payload)
    end
  end
end
