import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async authenticate(email: string ,password:string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) return null;

    if (user.isBanned) {
      throw new HttpException('This account is banned ,Contact admin', 403);
    }

    return user;
  }

  async login(user: User, req: any, res: any) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const token = this.jwtService.sign(payload);

    req.session.user = user;

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 10000 ,
    });

    return {
      message: 'Login successful',
      user,
    };
  }

  async create(createAuthDto: CreateAuthDto) {
    const existing = await this.userRepo.findOne({
      where: { email: createAuthDto.email },
    });

    if (!existing) {
      const user = this.userRepo.create(createAuthDto);
      await this.userRepo.save(user);
      return { message: 'register succesfully', user };
    }

    if (existing.isBanned) {
      throw new HttpException('This account is banned ,Contact admin', 403);
    }

    return { message: 'already existed', user: existing };
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: any) {
    return this.userRepo.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.userRepo.delete(id);
  }
}
