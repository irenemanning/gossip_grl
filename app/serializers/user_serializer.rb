class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_image

  has_many :posts
  has_many :comments, through: :posts

end
