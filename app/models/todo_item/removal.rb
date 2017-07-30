class TodoItem::Removal < ActiveType::Object
  nests_one :todo_item

  validates :todo_item, presence: true

  before_save :destroy_todo_item

  delegate :todo_list, to: :todo_item, prefix: false, allow_nil: true

  private

  def destroy_todo_item
    todo_item.destroy!
  end
end
