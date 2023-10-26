class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id
  has_many :post_hashtags 
  has_many :comments
  belongs_to :user
end
