class QuoteLink < ApplicationRecord
  belongs_to :quote_a, class_name: "Quote"
  belongs_to :quote_b, class_name: "Quote"
end
