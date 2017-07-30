class TodoList::CompletedTodoItemsClearness < ActiveType::Object
  nests_one :todo_list

  validates :todo_list, presence: true

  before_save :destroy_compeleted_todo_items

  attr_reader :removed_todo_items

  private

  def destroy_compeleted_todo_items
    @removed_todo_items = todo_list.todo_items.completed.destroy_all
    todo_list.reload
  end
end
