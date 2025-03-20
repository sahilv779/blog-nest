import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostService } from './post.service';

@Controller('posts') // ✅ Defines route prefix: /posts
export class PostController {
  constructor(private readonly postService: PostService) {}

  // ✅ Get all posts (Public)
  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  // ✅ Get posts by user (Protected)
  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  async getUserPosts(@Req() req) {
    return this.postService.getUserPosts(req.user.id);
  }

  // ✅ Create a post (Protected)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPost(@Body() body, @Req() req) {
    const post = {
      title: body.title,
      body: body.body,
      authorId: req.user.id,
    };
    return this.postService.create(post);
  }
  // ✅ Find post by ID (Public)
  @Get(':id')
  async getPost(@Req() req) {
    const res = await this.postService.findById(req.params.id);
    console.log(res);
    return res;
  }
}
