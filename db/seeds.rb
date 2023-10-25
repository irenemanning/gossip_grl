# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# Create users
user1 = User.create(username: 'user1', password: 'password1')
user2 = User.create(username: 'user2', password: 'password2')

# Create posts
post1 = user1.posts.create(body: 'This is the first post. #wtf #swag ')
post2 = user2.posts.create(body: 'Another post by user2. #swag #lol')

posts_data = [
  { body: 'This is the first post. #wtf #swag' },
  { body: 'Another post by user2. #swag #lol' },
]

posts_data.each do |post_data|
  post = user1.posts.create(body: post_data[:body])
  hashtags = post_data[:body].scan(/#\w+/).map { |tag| tag.gsub('#', '') }
  post.hashtags << hashtags.map { |tag| Hashtag.find_or_create_by(tag: tag) }
end