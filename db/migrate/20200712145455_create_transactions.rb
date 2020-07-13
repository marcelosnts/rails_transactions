class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.string :title
      t.string :transaction_type
      t.string :description
      t.float :value
      t.integer :user_id

      t.timestamps
    end
  end
end
