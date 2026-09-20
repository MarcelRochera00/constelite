class CreateEssays < ActiveRecord::Migration[8.1]
  def change
    create_table :essays do |t|
      t.string :title
      t.references :constellation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
