class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

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
    # def update 
    #     # @current_user.update!(params[:user])
    #     # render json: @current_user
    # end

    def update
        if params[:user][:profile_image].present? && params[:user][:profile_image].respond_to?(:read)
          if @current_user.update(profile_image: params[:user][:profile_image])
            render json: @current_user
          else
            render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
          end
        else
          if @current_user.update(user_params)
            render json: @current_user
          else
            render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
          end
        end
    end
    
    def delete
        password = params[:password]
        if @current_user.authenticate(password)
        @current_user.destroy
        reset_session
        render json: { message: 'Account deleted successfully' }
        else
        render json: { errors: ['Invalid password'] }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :password_confirmation, :profile_image)
    end

end
