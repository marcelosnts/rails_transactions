class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def index
    render json: @transactions = Transaction.where(user_id: current_user.id)
    # render json: {:transactions => Transaction.all}
  end

  def show
  end

  def new
    @transaction = Transaction.new
  end

  def edit
    render json: @transaction
  end

  def create
    @transaction = Transaction.new(transaction_params)
    @transaction.user_id = current_user.id

    respond_to do |format|
      if @transaction.save
        format.html { redirect_to @transaction, notice: 'Transaction was successfully created.' }
        format.json { render :show, status: :created, location: @transaction }
      else
        format.html { render :new }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    if @transaction.update(transaction_params)
      render json: {:transaction => @transaction, :status => 200, :message => 'Transaction was successfully updated.'}
    else
      render json: {:status => 500, :message => 'Something went wrong'}
    end
  end

  def destroy
    @transaction.destroy
    respond_to do |format|
      format.html { redirect_to transactions_url, notice: 'Transaction was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  
  require 'csv'
  def import
    CSV.foreach(params['file'].path, {headers: true, col_sep: ';'}) do |row|
        @transaction = row.to_hash
        @transaction['user_id'] = current_user.id
        Transaction.create! @transaction
    end

    redirect_to root_url, notice: "Data imported!"
  end

  private
    def set_transaction
      @transaction = Transaction.find(params[:id])
    end

    def transaction_params
      params.require(:transaction).permit(:title, :transaction_type, :description, :value, :user_id)
    end
end
