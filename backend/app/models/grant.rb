class Grant < ApplicationRecord
  belongs_to :stage
  belongs_to :account
  has_many :grant_tags
  has_many :tags, through: :grant_tags
  has_many :sources
  accepts_nested_attributes_for :grant_tags
  accepts_nested_attributes_for :sources

  require 'time'
  
  # add method that creats tags by array
  def create_tags_by_array(array)
    array.each do |tag_id| 
      self.grant_tags.create(tag_id: tag_id)
    end
  end


  # assign all scores
  def save_scores
    total = self.total_score
    alignment = self.alignment
    value = self.value
    timing = self.timing
    relationship = self.relationship
    self.update(rank_score: total, alignment_score: alignment, relationship_score: relationship, timing_score: timing, value_score: value)  
  end

  # t.bigint "stage_id", null: false
  # t.bigint "account_id", null: false
  # t.string "description"
  # t.string "fiscal_year"
  # t.string "ask_type"
  # t.integer "owner"
  # t.date "deadline"
  # t.string "app_type"
  # t.decimal "ask_amount"
  # t.decimal "min_amount"
  # t.decimal "max_amount"
  # t.decimal "fund_size"
  # t.string "link"
  # t.string "notes"
  # t.datetime "created_at", precision: 6, null: false
  # t.datetime "updated_at", precision: 6, null: false
  # t.string "name"
  # t.boolean "priority", default: false, null: false
  # t.boolean "rolling", default: false, null: false
  # t.boolean "repeat", default: false, null: false
  # t.float "rank_score", default: 0.0, null: false
  # t.float "timing_score", default: 0.0, null: false
  # t.float "alignment_score", default: 0.0, null: false
  # t.float "relationship_score", default: 0.0, null: false
  # t.float "value_score", default: 0.0, null: false
  # t.index ["account_id"], name: "index_grants_on_account_id"
  # t.index ["stage_id"], name: "index_grants_on_stage_id"

  # algorithm if it's already saved
  
  # algorithm
  def self.sort_by_priority
    self.all.sort_by {|g| g.total_score}.reverse
  end
  # define weights
  ALIGNMENT_WEIGHT = 0.25
  VALUE_WEIGHT = 0.25
  TIMING_WEIGHT = 0.25
  RELATIONSHIP_WEIGHT = 0.25
  # normalize score
  def total_score
    score = (self.alignment*ALIGNMENT_WEIGHT)+(self.value*VALUE_WEIGHT)+(self.timing*TIMING_WEIGHT)+(self.relationship*RELATIONSHIP_WEIGHT)
    normalize = score/10
  end
  # alignment score
  def alignment 
    score = 0
    tag_names = self.tags.map {|t| t.name}
    high = ["environment", "workforce development", "youth"]
    medium = ["food", "NYC"]
    low = ["EDI", "health", "energy", "community development"]
    high_overlap = tag_names & high
    medium_overlap = tag_names & medium
    low_overlap = tag_names & low
    score = (2*high_overlap.count) + (medium_overlap.count) + (0.5*low_overlap.count)
  end
  # value score
  def value
    ask_amt = self.ask_amount
    tier1 = 5000
    tier2 = 10000
    tier3 = 50000
    tier4 = 100000
    tier5 = 250000
    tier6 = 500000
    case ask_amt
    when 0..tier1
      return 0
    when tier1..(tier2-1)
      return 1
    when tier2..(tier3-1)
      return 4
    when tier3..(tier4-1)
      return 6
    when tier4..(tier5-1)
      return 8
    when tier5..(tier6-1)
      return 9
    else
      return 10
    end
  end
  # timing score
  def timing
    score = 0
    if self.rolling == true
      return 2
    end
    today = Date.current
    year_fr_today = today + 12.months
    six_fr_today = today + 6.months
    three_fr_today = today + 3.months
    one_fr_today = today.next_month
    deadline = self.deadline
    case deadline
    when today..(one_fr_today-1)
      return 10
    when one_fr_today..(three_fr_today-1)
      return 8
    when three_fr_today..(six_fr_today-1)
      return 6
    when six_fr_today..(year_fr_today-1)
      return 4
    else
      return 2
    end
  end
  # relationship score
  def relationship
    score = 0
    source = self.sources.first
    account = self.account
    contacts = self.account.contacts
    contact_types = contacts.map {|contact| contact.contact_type}
    if self.sources.count > 1
      score = score + 1
    end
    case source.lead_type
    when "indirect"
      score = score + 1
    when "direct"
      score = score + 3
    else
      score
    end
    case source.source_type
    when "board"
      score += 2
    when "executive"
      score += 1
    when "key partner"
      score += 1
    else
      score
    end
    if account.contacts.count > 1
      score += 1
    end
    if contact_types.include?("foundation")
      score += 1
    end
    if contact_types.include?("decision-maker")
      score += 3
    end
    return score
  end
end
