Rails.application.routes.draw do
  resources :hashtags
  resources :post_hashtags
  resources :comments
  resources :posts
  resources :users
end
