class Api::V1::PipelinesController < ApplicationController
    def index
        pipelines = Pipeline.all 
        render json: pipelines
    end
end
