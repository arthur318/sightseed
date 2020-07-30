class AddNameColumnToSources < ActiveRecord::Migration[6.0]
  def change
    add_column :sources, :name, :string
  end
end
