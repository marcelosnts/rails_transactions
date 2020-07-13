Rails.application.routes.draw do
  root 'home#index'
  
  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  resources :transactions do
    collection {post :import}
  end
  
  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  get 'upload_csv', to: 'transactions#upload_csv', as: 'upload_csv'
end
