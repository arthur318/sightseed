# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_26_072834) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.string "industry"
    t.string "account_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "shortlist", default: false, null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.boolean "primary", default: false, null: false
    t.string "first_name"
    t.string "last_name"
    t.string "title"
    t.string "phone"
    t.string "email"
    t.string "cultivation_level"
    t.string "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "contact_type"
    t.index ["account_id"], name: "index_contacts_on_account_id"
  end

  create_table "grant_tags", force: :cascade do |t|
    t.bigint "grant_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grant_id"], name: "index_grant_tags_on_grant_id"
    t.index ["tag_id"], name: "index_grant_tags_on_tag_id"
  end

  create_table "grants", force: :cascade do |t|
    t.bigint "stage_id", null: false
    t.bigint "account_id", null: false
    t.string "description"
    t.string "fiscal_year"
    t.string "ask_type"
    t.integer "owner"
    t.date "deadline"
    t.string "app_type"
    t.decimal "ask_amount"
    t.decimal "min_amount"
    t.decimal "max_amount"
    t.decimal "fund_size"
    t.string "link"
    t.string "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.boolean "priority", default: false, null: false
    t.boolean "rolling", default: false, null: false
    t.boolean "repeat", default: false, null: false
    t.float "rank_score", default: 0.0, null: false
    t.float "timing_score", default: 0.0, null: false
    t.float "alignment_score", default: 0.0, null: false
    t.float "relationship_score", default: 0.0, null: false
    t.float "value_score", default: 0.0, null: false
    t.index ["account_id"], name: "index_grants_on_account_id"
    t.index ["stage_id"], name: "index_grants_on_stage_id"
  end

  create_table "pipelines", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "sources", force: :cascade do |t|
    t.bigint "grant_id", null: false
    t.bigint "contact_id", null: false
    t.string "source_type"
    t.string "lead_type"
    t.string "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["contact_id"], name: "index_sources_on_contact_id"
    t.index ["grant_id"], name: "index_sources_on_grant_id"
  end

  create_table "stages", force: :cascade do |t|
    t.bigint "pipeline_id", null: false
    t.string "name"
    t.integer "rank_index"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["pipeline_id"], name: "index_stages_on_pipeline_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.bigint "pipeline_id", null: false
    t.string "priority_level"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "priority", default: false, null: false
    t.index ["pipeline_id"], name: "index_tags_on_pipeline_id"
  end

  create_table "user_pipelines", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "pipeline_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["pipeline_id"], name: "index_user_pipelines_on_pipeline_id"
    t.index ["user_id"], name: "index_user_pipelines_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "contacts", "accounts"
  add_foreign_key "grant_tags", "grants"
  add_foreign_key "grant_tags", "tags"
  add_foreign_key "grants", "accounts"
  add_foreign_key "grants", "stages"
  add_foreign_key "sources", "contacts"
  add_foreign_key "sources", "grants"
  add_foreign_key "stages", "pipelines"
  add_foreign_key "tags", "pipelines"
  add_foreign_key "user_pipelines", "pipelines"
  add_foreign_key "user_pipelines", "users"
end
