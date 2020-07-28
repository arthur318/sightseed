class ChangeGrantsTable < ActiveRecord::Migration[6.0]
  def change
    change_table(:grants) do |t|
      t.remove :priority
      t.column :priority, :boolean, null: false, default: false
      t.remove :rolling
      t.column :rolling, :boolean, null: false, default: false
      t.remove :repeat
      t.column :repeat, :boolean, null: false, default: false
      t.remove :rank_score
      t.column :rank_score, :float, null: false, default: 0
      t.remove :timing_score
      t.column :timing_score, :float, null: false, default: 0
      t.remove :relevence_score
      t.column :alignment_score, :float, null: false, default: 0
      t.remove :relationship_score
      t.column :relationship_score, :float, null: false, default: 0
      t.remove :value_score
      t.column :value_score, :float, null: false, default: 0
    end
  end
end
