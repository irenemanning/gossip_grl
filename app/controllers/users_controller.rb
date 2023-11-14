class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    # rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    #  /me
    def show
        render json: @current_user
    end

    # /signup
    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    # def render_not_found_response
    #     render json: { error: "Signup not found" }, status: :not_found
    # end

end
