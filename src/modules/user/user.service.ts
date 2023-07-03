import { BadRequestException, Inject, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
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
    ) {

    }

    async getOne(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException("id must be sent")
        }

        const user: User = await this._userRepository.findOne({ where: { id } })

        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async getAll(): Promise<User[]> {
        const users: User[] = await this._userRepository.find({
            where: {
                status: "ACTIVE"
            }
        })


        return users
    }

    async create(user: User): Promise<User> {
        const details: UserDetails = new UserDetails()
        user.details = details

        const saveUser = await this._userRepository.save(user)
        return saveUser
    }

    async update(id: number, user: User): Promise<User> {
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
