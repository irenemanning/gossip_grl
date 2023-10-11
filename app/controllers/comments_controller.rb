class CommentsController < ApplicationController
    before_action :authorize
    def index
        comments = Comment.all
        render json: comments
    end
    def show
        comment = Comment.find_by(id: params[:id])
        render json: comment
    end
    def create 
        comment = @current_user.comments.create!(comment_params)
        render json: comment, status: :created
    end
    def destroy
        comment = find_comment
        comment.destroy
        head :no_content
    end

    private

    def comment_params
        params.permit(:body, :post_id)
    end
    def find_comment
        @current_user.comments.find_by(params[:id])
    end
end
