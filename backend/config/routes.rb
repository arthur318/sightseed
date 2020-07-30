Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do 
      resources :users
      resources :pipelines
      resources :stages
      resources :grants
      resources :accounts
      resources :contacts
      resources :tags
      resources :grant_tags
      resources :sources
    end
    namespace :v2 do 
      resources :users
      resources :pipelines
      resources :stages
      resources :grants
      resources :accounts
      resources :contacts
      resources :tags
    end
  end



end
