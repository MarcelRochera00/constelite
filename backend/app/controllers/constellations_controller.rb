# app/controllers/constellations_controller.rb
class ConstellationsController < ApplicationController

  def index
    constellations = Constellation.all
    render json: constellations.as_json(include: :quotes)
  end

  def show
    constellation = Constellation.find(params[:id])
    
    confirmed_quotes = constellation.constellation_quotes.where(status: :confirmed).map(&:quote)
    suggested_quotes = constellation.constellation_quotes.where(status: :suggested).map(&:quote)
    
    ids = confirmed_quotes.map(&:id)
    quote_links = QuoteLink.where(quote_a_id: ids).or(QuoteLink.where(quote_b_id: ids))
    
    render json: {
      constellation: constellation,
      confirmed_quotes: confirmed_quotes,
      suggested_quotes: suggested_quotes,
      quote_links: quote_links
    }
  end

  def create
    constellation = Constellation.new(constellation_params)
    if constellation.save
      render json: constellation, status: :created
    else
      render json: constellation.errors, status: :unprocessable_entity
    end
  end

  def graph
    quotes = Quote.all
    quote_links = QuoteLink.all
    constellations_data = Constellation.all.map do |constellation|
      {
        id: constellation.id,
        title: constellation.title,
        quote_ids: constellation.constellation_quotes.map(&:quote_id)
      }
    end

    render json: {
      quotes: quotes,
      quote_links: quote_links,
      constellations: constellations_data
    }
  end
  
  private

  def constellation_params
    params.require(:constellation).permit(:title, :description)
  end
end
