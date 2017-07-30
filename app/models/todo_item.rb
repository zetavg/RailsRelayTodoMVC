class TodoItem < ApplicationRecord
  scope :active, -> { where(completed: false) }
  scope :completed, -> { where(completed: true) }

  belongs_to :todo_list

  validates :name, presence: true
end
