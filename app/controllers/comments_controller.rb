class CommentsController < ApplicationController
    before_action :authorize
    def index
        comments = Comment.includes(:user).order(created_at: :desc)
        render json: comments
    end
    def show
        comment = Comment.find_by(id: params[:id])
        render json: comment
    end
    def create 
        post = Post.find(params[:post_id])
        comment = post.comments.create!(body: params[:body], user_id: @current_user.id)
        render json: comment, status: :created
    end
    def destroy
        comment = find_comment
        comment.destroy
        head :no_content
    end

    private

    # def comment_params
    #     params.require(:comment).permit(:body, :post_id, :user_id)
    # end
    # def comment_params
    #     params.permit(:body, :post_id)
    # end
    def find_comment
        Comment.find(params[:id])
    end
end
