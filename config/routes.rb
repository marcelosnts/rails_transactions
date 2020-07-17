Rails.application.routes.draw do
  root 'home#index'
  
  resources :users, path: '/api/users'
  resources :sessions, only: [:new, :create, :destroy], path: '/api/sessions'
  resources :transactions, path: '/api/transactions' do
    collection {post :import}
  end
  
  # get 'signup', to: 'users#new', as: 'signup'
  # get 'login', to: 'sessions#new', as: 'login'
  # get 'logout', to: 'sessions#destroy', as: 'logout'

  # get 'upload_csv', to: 'transactions#upload_csv', as: 'upload_csv'
  match '*path', to: 'home#index', via: :all
end
