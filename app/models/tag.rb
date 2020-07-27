class Tag < ApplicationRecord
  belongs_to :pipeline
  has_many :grant_tags
  has_many :grants, through: :grant_tags
end
