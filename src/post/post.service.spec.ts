import { PostService } from './post.service';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockPost = {
  _id: '67bf98afbea6fdda3283cc8f',
  title: 'Test Post',
  body: 'This is a test post',
  authorId: 'author123',
};

const mockPostModel = {
  findById: jest.fn().mockReturnThis(), // mock findById to return 'this' to chain exec
  exec: jest.fn().mockResolvedValue(mockPost), // mock exec to resolve with mockPost
  create: jest.fn().mockResolvedValue(mockPost), // Mock create
  save: jest.fn().mockResolvedValue(mockPost), // Mock save
};

describe('PostService', () => {
  let service: PostService;
  let model: Model<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getModelToken(Post.name),
          useValue: mockPostModel, // Provide the mocked model
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    model = module.get<Model<Post>>(getModelToken(Post.name));
  });

  it('should fetch a post by ID', async () => {
    const post = await service.findById('67bf98afbea6fdda3283cc8f');

    expect(post).toEqual(mockPost);
  });
});
