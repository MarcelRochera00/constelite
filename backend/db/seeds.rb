# db/seeds.rb

QuoteLink.destroy_all
ConstellationQuote.destroy_all
Quote.destroy_all
Book.destroy_all
Author.destroy_all
Constellation.destroy_all

kafka = Author.create!(name: "Franz Kafka")
dostoievski = Author.create!(name: "Fiódor Dostoievski")
camus = Author.create!(name: "Albert Camus")

proceso = Book.create!(title: "El proceso", author: kafka, themes: "burocracia, culpa, absurdo")
metamorfosis = Book.create!(title: "La metamorfosis", author: kafka, themes: "alienación, identidad, familia")
castillo = Book.create!(title: "El castillo", author: kafka, themes: "burocracia, pertenencia, absurdo")
crimen_castigo = Book.create!(title: "Crimen y castigo", author: dostoievski, themes: "culpa, redención, pobreza")
hermanos_karamazov = Book.create!(title: "Los hermanos Karamázov", author: dostoievski, themes: "fe, libertad, familia")
extranjero = Book.create!(title: "El extranjero", author: camus, themes: "absurdo, indiferencia, muerte")
mito_sisifo = Book.create!(title: "El mito de Sísifo", author: camus, themes: "absurdo, libertad, rebeldía")

q1 = Quote.create!(text: "Alguien había hablado mal de él, porque sin haber hecho nada malo fue arrestado una mañana.", book: proceso, themes: "culpa, absurdo")
q2 = Quote.create!(text: "Despertó convertido en algo que ya no reconocía, y el mundo a su alrededor tampoco lo reconoció a él.", book: metamorfosis, themes: "identidad, transformación")
q3 = Quote.create!(text: "Cuanto más se acercaba al castillo, más lejano parecía volverse.", book: castillo, themes: "pertenencia, absurdo")
q4 = Quote.create!(text: "El sufrimiento, bien mirado, puede ser el único camino hacia algo parecido a la redención.", book: crimen_castigo, themes: "redención, culpa")
q5 = Quote.create!(text: "Si Dios no existe, entonces todo está permitido, y eso es lo más terrible de todo.", book: hermanos_karamazov, themes: "fe, libertad")
q6 = Quote.create!(text: "Hoy murió mi madre. O quizás ayer, no lo sé con certeza.", book: extranjero, themes: "indiferencia, muerte")
q7 = Quote.create!(text: "Hay un solo problema filosófico verdaderamente serio, y es decidir si la vida merece o no ser vivida.", book: mito_sisifo, themes: "absurdo, libertad")
q8 = Quote.create!(text: "Hay que imaginarse feliz a quien empuja la roca, aunque nunca llegue a la cima.", book: mito_sisifo, themes: "rebeldía, absurdo")
q9 = Quote.create!(text: "No era culpable de nada, y sin embargo la culpa lo perseguía como una sombra propia.", book: proceso, themes: "culpa, absurdo")
q10 = Quote.create!(text: "La familia entera aprendió a vivir con la puerta cerrada, fingiendo que dentro no había nadie distinto.", book: metamorfosis, themes: "familia, alienación")

puts "Seeds creados: #{Author.count} autores, #{Book.count} libros, #{Quote.count} frases"

miedo = Constellation.create!(
  title: "El miedo",
  description: "Cómo distintos autores retratan el miedo como fuerza motriz"
)

culpa_sin_causa = Constellation.create!(
  title: "Culpa sin causa",
  description: "La culpa como peso que no responde a ningún acto concreto"
)

ConstellationQuote.create!(constellation: miedo, quote: q1, status: :confirmed)
ConstellationQuote.create!(constellation: miedo, quote: q2, status: :confirmed)
ConstellationQuote.create!(constellation: miedo, quote: q3, status: :confirmed)

ConstellationQuote.create!(constellation: culpa_sin_causa, quote: q9, status: :confirmed)
ConstellationQuote.create!(constellation: culpa_sin_causa, quote: q4, status: :confirmed)
ConstellationQuote.create!(constellation: culpa_sin_causa, quote: q5, status: :confirmed)

puts "Constelaciones: #{Constellation.count}, ConstellationQuotes: #{ConstellationQuote.count}"

QuoteLink.create!(quote_a: q1, quote_b: q2)
QuoteLink.create!(quote_a: q1, quote_b: q3)
QuoteLink.create!(quote_a: q9, quote_b: q4)
QuoteLink.create!(quote_a: q9, quote_b: q5)


puts "QuoteLinks: #{QuoteLink.count}"