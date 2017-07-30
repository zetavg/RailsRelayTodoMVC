class TodoList::AllTodoItemsMark < ActiveType::Object
  nests_one :todo_list
  attribute :completed, :boolean

  validates :todo_list, presence: true

  before_save :mark_all_todo_items

  delegate :todo_items, to: :todo_list, prefix: false, allow_nil: true
  attr_reader :changed_todo_items

  private

  def mark_all_todo_items
    self.completed ||= false

    if self.completed
      todo_items = todo_list.todo_items.active
      todo_item_ids = todo_items.ids
      todo_items.update_all(completed: true)
    else
      todo_items = todo_list.todo_items.completed
      todo_item_ids = todo_items.ids
      todo_items.update_all(completed: false)
    end

    @changed_todo_items = todo_list.todo_items.where(id: todo_item_ids)
  end
end
