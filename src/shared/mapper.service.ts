import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { User } from 'src/modules/user/user.entity';
import { TypeMapper } from 'ts-mapper';

@Injectable()
export class MapperService extends TypeMapper {
    constructor() {
        super()
        this.config()
    }

    private config(): void {
        this.createMap<User, UserDto>()
            .map((enitity) => enitity.id, (dto) => dto.id)
            .map((enitity) => enitity.username, (dto) => dto.username)
            .map((enitity) => enitity.email, (dto) => dto.email)
            .map((enitity) => enitity.details, (dto) => dto.details)
            .map((enitity) => enitity.roles, (dto) => dto.roles)

    }
}