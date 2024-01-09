class PostsController < ApplicationController
    before_action :authorize
    
    def index
        posts = Post.includes(comments: :user).order(created_at: :desc)
        render json: posts
    end
    def show
        post = find_post
        render json: post
    end
    def create
        post = @current_user.posts.create!(post_params)
        hashtags = extract_hashtags_from_post_body(post.body)
        post.hashtags << hashtags.map { |tag| Hashtag.find_or_create_by(tag: tag) }
        render json: post, status: :created
    end
    def update
        post = @current_user.posts.find_by(id: params[:id])
        post.update!(post_params)
        hashtags = extract_hashtags_from_post_body(post.body)
        post.hashtags << hashtags.map { |tag| Hashtag.find_or_create_by(tag: tag) }
        render json: post
    end
    def destroy
        post = find_post
        post.destroy
        head :no_content
    end

    private 

    def post_params
        # params.permit(:body)
        params.require(:post).permit(:body)
    end
    def find_post
        Post.find_by(id: params[:id])
    end
    def extract_hashtags_from_post_body(body)
        body.scan(/#\w+/).map { |tag| tag.gsub('#', '') }
    end

end
