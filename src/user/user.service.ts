import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOrCreateUser(profile: any, provider: string): Promise<User> {
    const { id, emails, displayName } = profile;
    const email = emails?.[0]?.value || '';

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = new this.userModel({
        providerId: id,
        email,
        name: displayName,
        provider,
      });
      await user.save();
    }

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }
}
