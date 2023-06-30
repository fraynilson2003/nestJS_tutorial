import { BadRequestException, Inject, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { MapperService } from '../../shared/mapper.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UpdateResult, getConnection } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';



@Injectable()
export class UserService {
    constructor(
        //@InjectRepository(User)
        private readonly _userRepository: UserRepository,
        private readonly _mapperService: MapperService
    ) {

    }

    async getOne(id: number): Promise<UserDto> {
        if (!id) {
            throw new BadRequestException("id must be sent")
        }

        const user: User = await this._userRepository.findOne({ where: { id } })

        if (!user) {
            throw new NotFoundException()
        }

        return this._mapperService.map<User, UserDto>(user, new UserDto())
    }

    async getAll(): Promise<UserDto[]> {
        const users: User[] = await this._userRepository.find({
            where: {
                status: "ACTIVE"
            }
        })

        // if (!users.length) {
        //     throw new NotFoundException("No haynada")
        // }

        return this._mapperService.mapCollection<User, UserDto>(users, new UserDto())
    }

    async create(user: User): Promise<UserDto> {
        const details: UserDetails = new UserDetails()
        user.details = details

        const roleDefault = new Role()
        roleDefault.id = 1
        roleDefault.name = "GENERAL"
        roleDefault.description = "description"
        roleDefault.status = "ACTIVE"
        roleDefault.createdAt = new Date("2021-10-11")
        roleDefault.updatedAt = new Date("2021-10-11")


        user.roles = [roleDefault]

        const saveUser = await this._userRepository.save(user)
        return this._mapperService.map<User, UserDto>(user, new UserDto())
    }

    async update(id: number, user: User): Promise<UserDto> {
        const updateUser: UpdateResult = await this._userRepository.update(id, user)
        // if(updateUser.affected){

        // }
        const userResponse = await this.getOne(id)
        return userResponse
    }

    async delete(id: number): Promise<void> {
        const userExist = await this._userRepository.findOne({
            where: { id: id, status: "ACTIVE" }
        })

        if (!userExist) {
            throw new NotFoundException()
        }
        await this._userRepository.update(id, {
            status: "INACTIVE"
        })
    }

}
