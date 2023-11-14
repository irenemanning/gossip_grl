class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_image, :password

  has_many :posts
  has_many :comments, through: :posts

  include Rails.application.routes.url_helpers
  def profile_image
    rails_blob_path(object.profile_image, only_path: true) if object.profile_image.attached?
  end

end
