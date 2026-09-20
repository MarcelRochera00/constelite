class AddDescriptionToConstellations < ActiveRecord::Migration[8.1]
  def change
    add_column :constellations, :description, :text
  end
end
