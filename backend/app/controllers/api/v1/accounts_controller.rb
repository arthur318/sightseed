class Api::V1::AccountsController < ApplicationController
    def index
        accounts = Account.all 
        render json: accounts
    end

    def create
        # byebug
        account = Account.create(account_params)
        render json: account
    end

    def show
        account = Account.find(params[:id]) 
        render json: account
        # render json: instructor, only: [:name, :id], include: :students
    end

    def update
        
        account = Account.find(params[:id]) 
        account.update(account_params)
        render json: account
    end
  
    def destroy
        account = Account.find(params[:id]) 
        account.destroy
    end



    private

    def account_params
        params.require(:account).permit(:name, :industry, :account_type, :shortlist)
    end

end
