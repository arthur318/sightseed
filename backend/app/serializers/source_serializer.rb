class SourceSerializer < ActiveModel::Serializer
  attributes :id, :name, :grant_id, :source_type, :lead_type
end
