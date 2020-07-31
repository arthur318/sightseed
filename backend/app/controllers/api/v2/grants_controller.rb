class Api::V2::GrantsController < ApplicationController
    def index
        grants = Grant.sort_by_priority
        render json: grants
    end
end