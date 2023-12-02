class Post < ApplicationRecord
    has_many :post_hashtags 
    has_many :comments
    belongs_to :user
    has_and_belongs_to_many :hashtags, join_table: "post_hashtags", association_foreign_key: "hashtag_id"
    
    validates :body, presence: true
end
