class CreateStages < ActiveRecord::Migration[6.0]
  def change
    create_table :stages do |t|
      t.belongs_to :pipeline, null: false, foreign_key: true
      t.string :name
      t.integer :rank_index

      t.timestamps
    end
  end
end
