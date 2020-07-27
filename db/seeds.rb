# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'
require "time"

# Destroy tables; destroy dependent tables first
Source.destroy_all
GrantTag.destroy_all
Grant.destroy_all
Tag.destroy_all
Stage.destroy_all
Contact.destroy_all
UserPipeline.destroy_all
Pipeline.destroy_all
Account.destroy_all
User.destroy_all

# Reset sequence
Account.reset_pk_sequence
Contact.reset_pk_sequence
Pipeline.reset_pk_sequence
Source.reset_pk_sequence
Stage.reset_pk_sequence
Tag.reset_pk_sequence
User.reset_pk_sequence
Grant.reset_pk_sequence
UserPipeline.reset_pk_sequence
GrantTag.reset_pk_sequence

# Seed data
u1 = User.create(username: "arthur", name: "Arthur", email: "email@gmail.com", password_digest: "password")
a1 = Account.create(name: "Wells Fargo Regional Grants", industry: "Bank", shortlist: true, account_type: "corporate")
a2 = Account.create(name: "Lyft", industry: "Technology", shortlist: true, account_type: "corporate")
a3 = Account.create(name: "Green City Force", industry: "Nonprofit", shortlist: true, account_type: "nonprofit")
p1 = Pipeline.create(name: "Corporate Pipeline")
up1 = UserPipeline.create(user_id: u1.id, pipeline_id: p1.id)

c1 = Contact.create(account_id: a1.id, primary: true, first_name: "Brandee", last_name: "McHale", contact_type: "foundation")
c2 = Contact.create(account_id: a3.id, first_name: "Micah", last_name: "Kotch", contact_type: "board")
s1 = Stage.create(pipeline_id: p1.id, name: "Prospect", rank_index: 1)
s2 = Stage.create(pipeline_id: p1.id, name: "Applying", rank_index: 2)
s3 = Stage.create(pipeline_id: p1.id, name: "Submitted", rank_index: 3)
s4 = Stage.create(pipeline_id: p1.id, name: "Awarded", rank_index: 4)
s5 = Stage.create(pipeline_id: p1.id, name: "Declined", rank_index: 5)
s6 = Stage.create(pipeline_id: p1.id, name: "Chose Not To Apply", rank_index: 6)
s7 = Stage.create(pipeline_id: p1.id, name: "Ineligible", rank_index: 7)

t1 = Tag.create(name: "environment", pipeline_id: p1.id, priority_level: "high")
t2 = Tag.create(name: "education", pipeline_id: p1.id, priority_level: "high")
t3 = Tag.create(name: "workforce development", pipeline_id: p1.id, priority_level: "high")
t4 = Tag.create(name: "community development", pipeline_id: p1.id, priority_level: "medium")
t5 = Tag.create(name: "health", pipeline_id: p1.id)
t6 = Tag.create(name: "EDI", pipeline_id: p1.id)
t7 = Tag.create(name: "youth", pipeline_id: p1.id)
t8 = Tag.create(name: "energy", pipeline_id: p1.id)
t9 = Tag.create(name: "food", pipeline_id: p1.id)
t10 = Tag.create(name: "NYC", pipeline_id: p1.id)

g1 = Grant.create(name: "Wells Fargo", stage_id: s1.id, account_id: a1.id, description: "In the Greater New York and Southern New York regions, Wells Fargo makes contributions in philanthropic focus areas that we believe are important to communities’ vitality and success. We support programs and organizations that serve low-and moderate-income individuals and we prioritize organizations that intentionally promote diversity, equity, and inclusion. $5mm in US; Brandee McKayle -- New president, from Citi Foundation",
priority: true, fiscal_year: "FY21", ask_type: "grant-general", owner: u1.id, deadline: Date.parse("Oct 1 2020"), rolling: false, 
repeat: true, app_type: "online portal", ask_amount: 100000, min_amount: 2000, max_amount: 500000, fund_size: 70000000, link: "https://www.wellsfargo.com/about/corporate-responsibility/community-giving/grant-process/")

g2 = Grant.create(name: "LyftUp Community Grants", stage_id: s1.id, account_id: a2.id, description: "The LyftUp Community Grants Program awards up to $20,000 in ride credits to organizations across the country making a difference in their communities. Tell us about your impact, and how Lyft ride credits can keep driving you forward.",
fiscal_year: "FY21", ask_type: "grant-program", owner: u1.id, rolling: true, app_type: "online portal", ask_amount: 5000, min_amount: 1000, max_amount: 5000, fund_size: 20000, link: "https://docs.google.com/forms/d/e/1FAIpQLSf_FA7pddKQ8BGJnJKJ4JijoqP4su7PZoKy35L_xd0tdxjhsQ/viewform")

gt1 = GrantTag.create(grant_id: g1.id, tag_id: t1.id)
gt2 = GrantTag.create(grant_id: g1.id, tag_id: t2.id)
gt3 = GrantTag.create(grant_id: g1.id, tag_id: t3.id)
gt4 = GrantTag.create(grant_id: g1.id, tag_id: t4.id)
gt5 = GrantTag.create(grant_id: g1.id, tag_id: t5.id)

source1 = Source.create(grant_id: g1.id, contact_id: c2.id, source_type: "board", lead_type: "direct")
source2 = Source.create(grant_id: g2.id, contact_id: c2.id, source_type: "board", lead_type: "indirect")
