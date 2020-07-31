class AccountSerializer < ActiveModel::Serializer
  attributes :id, :name, :account_type, :industry, :shortlist
  has_many :contacts
end
