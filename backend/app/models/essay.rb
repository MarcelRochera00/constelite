class Essay < ApplicationRecord
  belongs_to :constellation
  has_rich_text :body
end
