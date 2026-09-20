class ConstellationQuote < ApplicationRecord
  belongs_to :constellation
  belongs_to :quote

  enum :status, { confirmed: 0, suggested: 1 }
end
