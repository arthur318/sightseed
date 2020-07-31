class AddPriorityColumnToTags < ActiveRecord::Migration[6.0]
  def change
    add_column :tags, :priority, :boolean, null: false, default: false
  end
end
