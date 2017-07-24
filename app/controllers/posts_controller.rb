class PostsController < ApplicationController
    def index
        # Lists all posts (blog homepage)
        @posts = Post.all
    end

    def new
        # Form to make a new post
    end

    def create
        # Creates a new post
        @post = Post.new(post_params)

        @post.save
    end

    def show
        # Shows an individual post
    end

    private
        def post_params
            params.require(:newpost).permit(:title, :text)
        end
end
