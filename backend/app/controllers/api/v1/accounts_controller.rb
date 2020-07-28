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

    private

    def account_params
        params.require(:account).permit(:name, :industry, :account_type, :shortlist)
    end

end
