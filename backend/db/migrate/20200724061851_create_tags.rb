class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.belongs_to :pipeline, null: false, foreign_key: true
      t.string :priority_level

      t.timestamps
    end
  end
end
