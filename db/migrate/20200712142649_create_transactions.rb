class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.string :title
      t.integer :type
      t.string :description
      t.float :value

      t.timestamps
    end
  end
end
