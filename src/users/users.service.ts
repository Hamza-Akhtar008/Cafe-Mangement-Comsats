import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

async createOwner(name: string, email: string, password: string) {
  if (!password) {
    throw new Error('Password is required'); 
  }
  if (!name) {
    throw new Error('Name is required'); 
  }
if (!email) {
    throw new Error('Email is required'); 
  }
  const existing = await this.userRepo.findOne({ where: { email } });
  if (existing) {
    throw new Error('Email already in use');
  }

  const hash = await bcrypt.hash(password, 10);

  const user = this.userRepo.create({
    name,
    email,
    passwordHash: hash,
    role: UserRole.OWNER,
  });

  return this.userRepo.save(user);
}

  async createManager(name: string, email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ name, email, passwordHash: hash, role: UserRole.MANAGER });
    return this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

 async getAllManagers() {
  return this.userRepo.find({
    where: { role: UserRole.MANAGER },
  });
}

 async deleteUserById(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({where:{id}});

    if (!user) {
      return null; // If user not found, return null
    }

    await this.userRepo.remove(user); // Delete the user
    return user; // Return the deleted user info
  }

}
