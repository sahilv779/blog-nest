import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { PostDocument } from './post.schema';

@Injectable()
export class PostRepository {
  constructor(@InjectModel('Post') private postModel: Model<PostDocument>) {}

  async createPost(
    title: string,
    content: string,
    authorId: string,
  ): Promise<PostDocument> {
    const newPost = new this.postModel({ title, content, authorId });
    return await newPost.save();
  }

  async getAllPosts(): Promise<PostDocument[]> {
    return this.postModel.find().populate('authorId', 'name email').exec();
  }

  async getPostById(postId: string): Promise<PostDocument | null> {
    return this.postModel.findById(postId).exec();
  }

  async updatePost(
    postId: string,
    title: string,
    content: string,
  ): Promise<PostDocument | null> {
    return this.postModel
      .findByIdAndUpdate(postId, { title, content }, { new: true })
      .exec();
  }

  async deletePost(postId: string): Promise<void> {
    await this.postModel.findByIdAndDelete(postId).exec();
  }
}
