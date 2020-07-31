class AddNameToGrants < ActiveRecord::Migration[6.0]
  def change
    add_column :grants, :name, :string
  end
end
