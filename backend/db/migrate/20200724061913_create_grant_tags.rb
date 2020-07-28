class CreateGrantTags < ActiveRecord::Migration[6.0]
  def change
    create_table :grant_tags do |t|
      t.belongs_to :grant, null: false, foreign_key: true
      t.belongs_to :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
