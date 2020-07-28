class Api::V1::ContactsController < ApplicationController
    def index
        contacts = Contact.all 
        render json: contacts
    end

    def create
        # byebug
        contact = Contact.create(contact_params)
        render json: contact
    end

    private

    def contact_params
        params.require(:contact).permit(:account_id, :first_name, :last_name, :primary, :contact_type, :title, :email, :phone, :notes)
    end

end
