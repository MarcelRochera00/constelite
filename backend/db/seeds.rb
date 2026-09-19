# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# db/seeds.rb

# Limpiar antes de repoblar, para poder correr esto varias veces sin duplicar
Quote.destroy_all
Book.destroy_all
Author.destroy_all

kafka = Author.create!(name: "Franz Kafka")
dostoievski = Author.create!(name: "Fiódor Dostoievski")

metamorfosis = Book.create!(
  title: "La metamorfosis",
  author: kafka,
  themes: "alienación, identidad, familia"
)

proceso = Book.create!(
  title: "El proceso",
  author: kafka,
  themes: "burocracia, culpa, absurdo"
)

crimen_castigo = Book.create!(
  title: "Crimen y castigo",
  author: dostoievski,
  themes: "culpa, redención, pobreza"
)

Quote.create!(
  text: "Alguien tenía que haber calumniado a Josef K., pues sin haber hecho nada malo fue detenido una mañana.",
  book: proceso,
  themes: "culpa, absurdo"
)

Quote.create!(
  text: "Cuando Gregor Samsa despertó una mañana después de un sueño intranquilo, se encontró en su cama convertido en un monstruoso insecto.",
  book: metamorfosis,
  themes: "identidad, transformación"
)

Quote.create!(
  text: "La idea de que el sufrimiento puede ser el camino hacia la redención, no un castigo sin sentido.",
  book: crimen_castigo,
  themes: "redención"
)

puts "Seeds creados: #{Author.count} autores, #{Book.count} libros, #{Quote.count} frases"
