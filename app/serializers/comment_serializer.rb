class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :post_id
  belongs_to :post
  belongs_to :user
end
