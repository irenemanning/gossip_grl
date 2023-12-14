class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :hashtags
  has_many :post_hashtags 
  has_many :comments
  belongs_to :user

  def hashtags
    object.post_hashtags.map do |post_hashtag|
      Hashtag.find(post_hashtag.hashtag_id).tag
    end
  end

end
