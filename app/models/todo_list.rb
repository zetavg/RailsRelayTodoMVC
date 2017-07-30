class TodoList < ApplicationRecord
  belongs_to :user
  has_many :todo_items

  validates :name, presence: true

  def todo_items_count
    todo_items.count
  end

  def active_todo_items_count
    todo_items.active.count
  end

  def completed_todo_items_count
    todo_items.completed.count
  end
end
