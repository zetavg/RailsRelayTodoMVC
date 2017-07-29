class User < ApplicationRecord
  has_one :todo_list

  validates :name, presence: true
end
