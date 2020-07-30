class Api::V1::GrantsController < ApplicationController
    def index
        grants = Grant.all 
        render json: grants
    end



    def show
        grant = Grant.find(params[:id]) 
        render json: grant 
        # render json: instructor, only: [:name, :id], include: :students
    end

    def create
        # byebug
        grant = Grant.create(grant_params)
        grant.sources.create(source_params)
        grant.save_scores
        # byebug
        grant.create_tags_by_array(tag_params)
            render json: grant
        # if tag_params != null
        #     grant.create_tags_by_array(tag_params)
        #     render json: grant
        # else
        #     # byebug
        
        #     render json: grant
        # end
        
        
    end


    def update
        
        grant = Grant.find(params[:id]) 
        grant.update(grant_params)
        render json: grant
    end
  
    def destroy
        grant = Grant.find(params[:id]) 
        account.destroy
    end


    private

    def grant_params
        params.require(:grant).permit(:name, :priority, :stage_id, :fiscal_year, :account_id, :repeat, :ask_type, :app_type, :deadline, :rolling, :ask_amount, :fund_size, :link, :notes, :source_name, :tag_id)
    end

    def source_params
        params.require(:source).permit(:name, :source_type, :lead_type)
    end

    def tag_params
        params.require(:tag_ids)
    end
end
