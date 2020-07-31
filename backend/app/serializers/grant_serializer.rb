class GrantSerializer < ActiveModel::Serializer
  attributes :id, :name, :stage, :account, :priority_yes, :repeat_yes, :fiscal_year, :ask_type, :deadline, :rolling_yes, :rolling, :app_type, :ask_amount, :source_name, :source_type, :lead_type, :fund_size, :tags, :notes, :link, :rank_score
  has_many :sources

  def repeat_yes
    self.object.repeat ? "Yes" : "No"
    end
  def priority_yes
    self.object.priority ? "Yes" : "No"
    end
  def rolling_yes
    self.object.rolling ? "Yes" : "No"
    end
    def stage
        self.object.stage.name
      end 
    def account
    self.object.account.name
  end 
  def source_name
    self.object.sources.map {|t| t.name}
  end
  def tags
    self.object.tags.map {|t| t.name}
  end
  def source_type
    self.object.sources.map {|t| t.source_type}
  end
  def lead_type
    self.object.sources.map {|t| t.lead_type}
  end
end
