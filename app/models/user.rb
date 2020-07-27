class User < ApplicationRecord
    has_many :user_pipelines
    has_many :pipelines, through: :user_pipelines 

end
