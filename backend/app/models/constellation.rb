class Constellation < ApplicationRecord
  has_many :constellation_quotes
  has_many :quotes, through: :constellation_quotes
end
