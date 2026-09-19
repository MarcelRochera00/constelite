# app/controllers/quotes_controller.rb
class QuotesController < ApplicationController
  def index
    quotes = Quote.all
    render json: quotes.as_json(include: { book: { include: :author } })
  end

  def show
    quote = Quote.find(params[:id])
    render json: quote.as_json(include: { book: { include: :author } })
  end

  def create
    quote = Quote.new(quote_params)
    if quote.save
      render json: quote, status: :created
    else
      render json: quote.errors, status: :unprocessable_entity
    end
  end

  private

  def quote_params
    params.require(:quote).permit(:text, :book_id, :themes)
  end
end
