import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schemas';

const mockUser = {
  _id: {
    $oid: '67bf517f8d49b4f2ea449a43',
  },
  email: 'Neva_Jakubowski@hotmail.com',
  name: 'Alison Kunze',
  providerId: 'a373c6e8-80c7-4c9e-ac45-e5759e9c389a',
  provider: 'google',
  __v: 0,
};

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn().mockReturnThis(),
            create: jest.fn().mockResolvedValue(mockUser),
            exec: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should find a user by email', async () => {
    const user = await service.findOneByEmail('Neva_Jakubowski@hotmail.com');
    expect(user).toEqual(mockUser);
  });
});
