class CreateGrants < ActiveRecord::Migration[6.0]
  def change
    create_table :grants do |t|
      t.belongs_to :stage, null: false, foreign_key: true
      t.belongs_to :account, null: false, foreign_key: true
      t.string :description
      t.float :rank_score
      t.float :value_score
      t.float :timing_score
      t.float :relevence_score
      t.float :relationship_score
      t.boolean :priority
      t.string :fiscal_year
      t.string :ask_type
      t.integer :owner
      t.date :deadline
      t.boolean :rolling
      t.boolean :repeat
      t.string :app_type
      t.decimal :ask_amount
      t.decimal :min_amount
      t.decimal :max_amount
      t.decimal :fund_size
      t.string :link
      t.string :notes

      t.timestamps
    end
  end
end
