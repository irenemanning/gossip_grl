Rails.application.routes.draw do
  resources :users
  get '/hello', to: 'application#hello_world'
end
