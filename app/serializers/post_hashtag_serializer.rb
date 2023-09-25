class PostHashtagSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :hashtag_id
end
