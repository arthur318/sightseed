class AddPriorityColumnNameToAccount < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :shortlist, :boolean
  end
end
