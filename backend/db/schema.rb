# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_09_20_172419) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.datetime "updated_at", null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "authors", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "books", force: :cascade do |t|
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.text "themes"
    t.string "title"
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_books_on_author_id"
  end

  create_table "constellation_quotes", force: :cascade do |t|
    t.float "confidence_score"
    t.bigint "constellation_id", null: false
    t.datetime "created_at", null: false
    t.bigint "quote_id", null: false
    t.integer "status"
    t.datetime "updated_at", null: false
    t.index ["constellation_id"], name: "index_constellation_quotes_on_constellation_id"
    t.index ["quote_id"], name: "index_constellation_quotes_on_quote_id"
  end

  create_table "constellations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "title"
    t.datetime "updated_at", null: false
  end

  create_table "essays", force: :cascade do |t|
    t.bigint "constellation_id", null: false
    t.datetime "created_at", null: false
    t.string "title"
    t.datetime "updated_at", null: false
    t.index ["constellation_id"], name: "index_essays_on_constellation_id"
  end

  create_table "quote_links", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "quote_a_id", null: false
    t.bigint "quote_b_id", null: false
    t.datetime "updated_at", null: false
    t.index ["quote_a_id"], name: "index_quote_links_on_quote_a_id"
    t.index ["quote_b_id"], name: "index_quote_links_on_quote_b_id"
  end

  create_table "quotes", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.datetime "created_at", null: false
    t.text "text"
    t.text "themes"
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_quotes_on_book_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "books", "authors"
  add_foreign_key "constellation_quotes", "constellations"
  add_foreign_key "constellation_quotes", "quotes"
  add_foreign_key "essays", "constellations"
  add_foreign_key "quote_links", "quotes", column: "quote_a_id"
  add_foreign_key "quote_links", "quotes", column: "quote_b_id"
  add_foreign_key "quotes", "books"
end
