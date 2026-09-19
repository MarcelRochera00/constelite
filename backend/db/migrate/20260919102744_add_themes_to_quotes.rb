class AddThemesToQuotes < ActiveRecord::Migration[8.1]
  def change
    add_column :quotes, :themes, :text
  end
end
