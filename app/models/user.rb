class User < ApplicationRecord
  has_one :todo_list
  has_many :todo_lists
  has_many :todo_items, through: :todo_lists

  validates :name, presence: true
end
