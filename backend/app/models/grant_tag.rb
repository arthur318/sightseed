class GrantTag < ApplicationRecord
  belongs_to :grant
  belongs_to :tag
end
