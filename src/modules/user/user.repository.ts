import { Repository, DataSource } from 'typeorm';
import { User } from "./user.entity";
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        private dataSource: DataSource,
    ) {
        super(User, dataSource.createEntityManager());
    }


}