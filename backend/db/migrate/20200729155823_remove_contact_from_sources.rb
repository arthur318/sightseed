class RemoveContactFromSources < ActiveRecord::Migration[6.0]
  def change
    remove_column :sources, :contact_id
  end
end
