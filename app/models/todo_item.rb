class TodoItem < ApplicationRecord
  belongs_to :todo_list

  validates :name, presence: true
end
