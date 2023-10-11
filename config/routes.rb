Rails.application.routes.draw do
  resources :hashtags
  resources :post_hashtags
  resources :comments
  resources :posts
  resources :users

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
end
