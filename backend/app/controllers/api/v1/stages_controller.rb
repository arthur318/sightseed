class Api::V1::StagesController < ApplicationController
    def index
        stages = Stage.all 
        render json: stages
    end
end
