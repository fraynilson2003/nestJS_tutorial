import { Repository, DataSource } from 'typeorm';
import { User } from "./user.entity";
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { MapperService } from 'src/shared/mapper.service';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        private dataSource: DataSource,
        private readonly _mapperService: MapperService
    ) {
        super(User, dataSource.createEntityManager());
    }


}