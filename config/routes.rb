Rails.application.routes.draw do
  resources :hashtags
  resources :post_hashtags
  resources :comments
  resources :posts
  resources :users

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  patch "/me/update", to: "users#update"
  delete "/me/delete", to: "users#delete"
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # get "/*path", to: "application#frontend"
  
end
