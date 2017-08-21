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

    def destroy
        if Post.delete(post_delete_params)
            return true
        end
        return false
    end

    private
        def post_params
            params.require(:newpost).permit(:title, :text)
        end

        def post_delete_params
            params.require(:id)
        end
end
