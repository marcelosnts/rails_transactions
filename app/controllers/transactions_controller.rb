class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:show, :edit, :update, :destroy]

  def index
    if current_user
      @transactions = Transaction.all
    else
      redirect_to login_path
    end
  end

  def show
  end

  def new
    @transaction = Transaction.new
  end

  def edit
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
    respond_to do |format|
      if @transaction.update(transaction_params)
        format.html { redirect_to @transaction, notice: 'Transaction was successfully updated.' }
        format.json { render :show, status: :ok, location: @transaction }
      else
        format.html { render :edit }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
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
    binding.pry
    CSV.foreach(params['csv_file'].path, {headers: true, col_sep: ';'}) do |row|
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
