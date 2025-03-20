import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  async getUserPosts(@Req() req) {
    return this.postService.getUserPosts(req.user.id);
  }

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
  @Get(':id')
  async getPost(@Req() req) {
    const res = await this.postService.findById(req.params.id);
    console.log(res);
    return res;
  }
  @Delete(':id')
  async deletePost(@Req() req) {
    return this.postService.delete(req.params.id);
  }
}
