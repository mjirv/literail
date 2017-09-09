class PostsController < ApplicationController
    def index
        # Lists all posts (blog homepage)
        @is_admin = false
        if admin_param['admin_token'] == ENV['ADMIN_TOKEN']
            @is_admin = true
        end
        @posts = Post.all
    end

    def new
        # Form to make a new post
    end

    def create
        # Creates a new post
        @post = Post.new(post_params)

        if @post.save
            render json: {id: @post.id}, status: :ok
        end
    end

    def show
        # Shows an individual post
    end

    def update
        # Updates a posti
        if Post.find(params[:id]).update(post_params)
            render json: {id: params[:id]}, status: :ok
        end
        return false
    end

    def destroy
        if Post.delete(post_delete_params)
            render json: {id: post_delete_params}, status: :ok
        end
        return false
    end

    private
        def admin_param
            params.permit(:admin_token)
        end
        def post_params
            params.require(:newpost).permit(:title, :text)
        end

        def post_delete_params
            params.require(:id)
        end
end
