class ChangeShortlistColumnInAccounts < ActiveRecord::Migration[6.0]
  def change
    change_column :accounts, :shortlist, :boolean, null: false, default: false
  end
end
