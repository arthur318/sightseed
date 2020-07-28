class AddTypeColumnToContacts < ActiveRecord::Migration[6.0]
  def change
    add_column :contacts, :contact_type, :string
  end
end
