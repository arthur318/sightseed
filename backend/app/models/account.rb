class Account < ApplicationRecord
    has_many :contacts
    has_many :grants
end
