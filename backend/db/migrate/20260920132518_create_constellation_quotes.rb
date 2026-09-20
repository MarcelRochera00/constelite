class CreateConstellationQuotes < ActiveRecord::Migration[8.1]
  def change
    create_table :constellation_quotes do |t|
      t.references :constellation, null: false, foreign_key: true
      t.references :quote, null: false, foreign_key: true
      t.integer :status
      t.float :confidence_score

      t.timestamps
    end
  end
end
