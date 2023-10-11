class PostsController < ApplicationController
    before_action :authorize
    def index
        posts = Post.all
        render json: posts
    end
    def show
        post = find_post
        render json: wine
    end
    def create
        post = Post.create!(post_params)
        render json: post, status: :created
    end
    def update
        post = find_post
        post.update(post_params)
        render json: post
    end
    def destroy
        post = find_post
        post.destroy
        head :no_content
    end

    private 

    def post_params
        params.permit(:body)
    end
    def find_post
        Post.find_by(id: params[:id])
    end
end
