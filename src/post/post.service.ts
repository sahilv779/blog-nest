import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) public postModel: Model<PostDocument>) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postModel.find().populate('authorId', 'name email').exec();
  }

  // ✅ Get posts by user
  async getUserPosts(userId: string): Promise<Post[]> {
    return this.postModel.find({ authorId: userId }).exec();
  }

  // ✅ Create a new post
  async create(postData: Partial<Post>): Promise<Post> {
    const newPost = new this.postModel(postData);
    return newPost.save();
  }

  // ✅ Find post by ID
  async findById(postId: string): Promise<Post | null> {
    return this.postModel.findById(postId).exec();
  }
  // ✅ Delete post
  async delete(postId: string): Promise<Post | null> {
    return this.postModel.findByIdAndDelete(postId).exec();
  }
}
