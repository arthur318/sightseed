class Contact < ApplicationRecord
  belongs_to :account
  has_many :sources
  has_many :grants, through: :grants
end
