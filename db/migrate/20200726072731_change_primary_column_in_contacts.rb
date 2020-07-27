class ChangePrimaryColumnInContacts < ActiveRecord::Migration[6.0]
  def change
    change_column :contacts, :primary, :boolean, null: false, default: false
  end
end
