import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { SharedModule } from '../../shared/shared.module';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        SharedModule
    ],
    providers: [UserService, UserRepository],
    controllers: [UserController]
})
export class UserModule { }
