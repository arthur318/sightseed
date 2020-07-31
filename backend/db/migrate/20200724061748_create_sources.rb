class CreateSources < ActiveRecord::Migration[6.0]
  def change
    create_table :sources do |t|
      t.belongs_to :grant, null: false, foreign_key: true
      t.belongs_to :contact, null: false, foreign_key: true
      t.string :source_type
      t.string :lead_type
      t.string :notes

      t.timestamps
    end
  end
end
