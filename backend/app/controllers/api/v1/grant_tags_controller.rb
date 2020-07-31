class Api::V1::GrantTagsController < ApplicationController
    def index
        grant_tags = GrantTag.all 
        render json: grant_tags
    end
end
