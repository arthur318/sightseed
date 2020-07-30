class AccountSerializer < ActiveModel::Serializer
  attributes :id, :name, :account_type, :industry
  has_many :contacts
end
