class ContactSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :primary, :first_name, :last_name, :title, :phone, :email, :notes, :contact_type
end
