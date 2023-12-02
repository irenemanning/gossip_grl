class User < ApplicationRecord
    has_one_attached :profile_image
    has_many :posts
    has_many :comments, through: :posts

    has_secure_password

    validates :password, presence: true, length: { minimum: 4 }, if: :password_required?
    validates :username, presence: true, uniqueness: { case_sensitive: false, scope: :id }
    validate :profile_image_validations, if: :profile_image_required?

    private
  
    def password_required?
      new_record? || password.present?
    end
    def profile_image_required?
        new_record? || changes[:profile_image].present?
    end
    def profile_image_validations
        errors.add(:profile_image, "is required") unless profile_image.attached?
        errors.add(:profile_image, "is too large") if profile_image.attached? && profile_image.blob.byte_size > 5.megabytes
          
    end
end
