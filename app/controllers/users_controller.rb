class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

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
    def update
        # @current_user.update!(user_params)
        # render json: @current_user
        if params[:username].present?
            @current_user.update!(username: params[:username])
            render json: @current_user
        elsif params[:password].present?
            @current_user.update!(password: params[:password], password_confirmation: params[:password_confirmation])
            render json: @current_user
        elsif params[:profile_image].present?
            @current_user.update!(profile_image: params[:profile_image])
            render json: @current_user
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :profile_image)
    end

end
