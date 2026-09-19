# app/controllers/books_controller.rb
class BooksController < ApplicationController
  def index
    books = Book.all
    render json: books.as_json(include: :author )
  end

  def show
    book = Book.find(params[:id])
    render json: book.as_json(include: :author )
  end

  def create
    book = Book.new(book_params)
    if book.save
      render json: book, status: :created
    else
      render json: book.errors, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.require(:book).permit(:title, :author_id, :themes)
  end
end
