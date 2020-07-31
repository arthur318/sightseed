class Api::V1::SourcesController < ApplicationController
    def index
        sources = Source.all 
        render json: sources
    end

    def create
        # byebug
        source = Source.create(source_params)
        render json: source
    end

    private

    def source_params
        params.require(:source).permit(:grant_id, :name, :source_type, :lead_type)
    end

end
