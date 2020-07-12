json.extract! transaction, :id, :title, :transaction_type, :description, :value, :created_at, :updated_at
json.url transaction_url(transaction, format: :json)
