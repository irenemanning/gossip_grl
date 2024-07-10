# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).


user1 = User.create(username: 'user1', password: 'password1')
user2 = User.create(username: 'user2', password: 'password2')

posts_data1 = [
  { body: 'Becky got the worst nosejob. #toobad #sosad #lol' },
  { body: 'A post by user1. #love #lol' },
]
posts_data2 = [
  { body: 'Irene is so cool. #love #tea' },
  { body: 'User2 here with a good post. #tea #slay #lol' },
]

posts_data1.each do |post_data|
  post = user1.posts.create(body: post_data[:body])
  hashtags = post_data[:body].scan(/#\w+/).map { |tag| tag.gsub('#', '') }
  post.hashtags << hashtags.map { |tag| Hashtag.find_or_create_by(tag: tag) }

  Comment.create(body: 'This is a comment on post1 by user2', user: user2, post: post)
  Comment.create(body: 'Another comment on post1 by user2', user: user2, post: post)
end

posts_data2.each do |post_data|
  post = user2.posts.create(body: post_data[:body])
  hashtags = post_data[:body].scan(/#\w+/).map { |tag| tag.gsub('#', '') }
  post.hashtags << hashtags.map { |tag| Hashtag.find_or_create_by(tag: tag) }

  Comment.create(body: 'This is a comment on post2 by user1', user: user1, post: post)
  Comment.create(body: 'Another comment on post2 by user1', user: user1, post: post)
end
