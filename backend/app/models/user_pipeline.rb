class UserPipeline < ApplicationRecord
  belongs_to :user
  belongs_to :pipeline
end
