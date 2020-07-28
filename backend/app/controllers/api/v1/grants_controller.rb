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
        render json: grant
    end


    # def update
    #     # byebug
    #     instructor = Instructor.find(params[:id])
    #     instructor.update(instructor_params)
    #     render json: instructor
    # end

    # def destroy
    #     instructor = Instructor.find(params[:id])
    #     instructor.destroy
    #     render json: "Instructor deleted!!"
    # end

    private

    def grant_params
        params.require(:grant).permit(:stage_id, :account_id, :name, :deadline, :ask_amount)
    end

end
