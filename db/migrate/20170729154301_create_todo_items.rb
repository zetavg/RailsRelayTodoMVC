class CreateTodoItems < ActiveRecord::Migration[5.1]
  def change
    create_table :todo_items do |t|
      t.references :todo_list, foreign_key: true, null: false
      t.boolean :completed, null: false, default: false
      t.string :name, null: false

      t.timestamps
    end
  end
end
