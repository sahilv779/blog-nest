import * as mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
import { UserSchema, User } from '../src/user/user.schemas';
import { Post, PostSchema } from '../src/post/post.schema';

config(); // Load environment variables

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog';

const generateUsers = async (UserModel: mongoose.Model<User>) => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      providerId: faker.string.uuid(),
      provider: 'google',
    });
  }
  const insertedUsers = await UserModel.insertMany(users);
  return insertedUsers.map((user) => user.toObject()); // ✅ Convert to plain objects
};

const generatePosts = async (
  PostModel: mongoose.Model<Post>,
  users: User[], // ✅ Now receives plain User objects
) => {
  const posts = [];
  for (let i = 0; i < 20; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    posts.push({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(3),
      authorId: randomUser.providerId, // ✅ Now works correctly
    } as Post);
  }
  return PostModel.insertMany(posts);
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Define Models
    const UserModel = mongoose.model<User>('User', UserSchema);
    const PostModel = mongoose.model<Post>('Post', PostSchema);

    // Generate Users
    console.log('⏳ Generating users...');
    const users = await generateUsers(UserModel);
    console.log(`✅ Created ${users.length} users`);

    // Generate Posts
    console.log('⏳ Generating posts...');
    const posts = await generatePosts(PostModel, users);
    console.log(`✅ Created ${posts.length} posts`);

    // Close connection
    await mongoose.disconnect();
    console.log('✅ Database seeding complete');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the script
seedDatabase();
