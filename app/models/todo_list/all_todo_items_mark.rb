class TodoList::AllTodoItemsMark < ActiveType::Object
  nests_one :todo_list
  attribute :completed, :boolean

  validates :todo_list, presence: true

  before_save :mark_all_todo_items

  delegate :todo_items, to: :todo_list, prefix: false, allow_nil: true

  private

  def mark_all_todo_items
    todo_list.todo_items.update_all(completed: completed || false)
  end
end
