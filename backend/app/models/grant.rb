class Grant < ApplicationRecord
  belongs_to :stage
  belongs_to :account
  has_many :grant_tags
  has_many :tags, through: :grant_tags
  has_many :sources
  has_many :contacts, through: :sources

  require 'time'
  
  # filters

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
      score += 1
    when "executive"
      score += 1
    when "key partner"
      score += 2
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
