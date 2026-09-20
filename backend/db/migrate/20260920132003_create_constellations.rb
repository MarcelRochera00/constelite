class CreateConstellations < ActiveRecord::Migration[8.1]
  def change
    create_table :constellations do |t|
      t.string :title
      t.timestamps
    end
  end
end
