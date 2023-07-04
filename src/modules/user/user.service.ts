import { BadRequestException, Inject, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UpdateResult, getConnection } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';
import { EStatusUser } from './interfaces/status-user.interface';
import { RoleRepository } from '../role/role.repository';
import { EStatusRole } from '../role/interfaces/status-role.interface';



@Injectable()
export class UserService {
    constructor(
        //@InjectRepository(User)
        private readonly _userRepository: UserRepository,
        private readonly _roleRepository: RoleRepository,

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
                status: EStatusUser.ACTIVE
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
            where: { id: id, status: EStatusUser.ACTIVE }
        })

        if (!userExist) {
            throw new NotFoundException()
        }
        await this._userRepository.update(id, {
            status: EStatusUser.INACTIVE
        })
    }

    async setRoleToUser(userId: number, roleId: number) {
        const userExist = await this._userRepository.findOne({
            where: { id: userId, status: EStatusUser.ACTIVE }
        })

        if (!userExist) {
            throw new NotFoundException()
        }


        const roleExist = await this._roleRepository.findOne({
            where: { id: roleId, status: EStatusRole.ACTIVE }
        })

        if (!roleExist) {
            throw new NotFoundException("Role does not exist")
        }

        userExist.roles.push(roleExist)

        await this._userRepository.save(userExist)
            .catch(err => console.log(err))


        return true
    }

}
