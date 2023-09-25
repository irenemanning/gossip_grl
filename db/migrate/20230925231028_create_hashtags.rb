class CreateHashtags < ActiveRecord::Migration[7.0]
  def change
    create_table :hashtags do |t|
      t.string :tag

      t.timestamps
    end
  end
end
