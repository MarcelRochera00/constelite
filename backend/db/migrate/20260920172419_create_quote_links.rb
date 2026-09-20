class CreateQuoteLinks < ActiveRecord::Migration[8.1]
  def change
    create_table :quote_links do |t|
      t.references :quote_a, null: false, foreign_key: { to_table: :quotes }
      t.references :quote_b, null: false, foreign_key: { to_table: :quotes }

      t.timestamps
    end
  end
end
