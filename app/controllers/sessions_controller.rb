class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_name(params[:name])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: {:user_id => session[:user_id], :status => 200}
    else
      flash.now[:alert] = "Name or password is invalid"
      render json: {:status => 500, :message => "Name or password invalid"}
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, notice: "Logged out!"
  end
end
