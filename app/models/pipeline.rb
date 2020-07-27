class Pipeline < ApplicationRecord
    has_many :stages
    has_many :grants, through: :stages
    has_many :user_pipelines
    has_many :users, through: :user_pipelines
    has_many :tags
end
