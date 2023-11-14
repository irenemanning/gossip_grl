class User < ApplicationRecord
    has_one_attached :profile_image
    has_many :posts
    has_many :comments, through: :posts

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true

end
