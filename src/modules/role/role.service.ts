import { BadRequestException, Inject, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { UpdateResult } from 'typeorm';
import { Role } from '../role/role.entity';
import { RoleRepository } from './role.repository';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
    constructor(
        //@InjectRepository(User)
        private readonly _roleRepository: RoleRepository,
    ) {

    }

    async getOne(id: number): Promise<Role> {
        if (!id) {
            throw new BadRequestException("id must be sent")
        }

        const role: Role = await this._roleRepository.findOne({
            where: { id: id }
        }).catch(err => { throw new Error(err) })

        if (!role) {
            throw new NotFoundException()
        }

        return role
    }


    async getAll(count: number = 20): Promise<Role[]> {

        const rolesList: Role[] = await this._roleRepository.find({
            take: count,
        })

        if (!rolesList.length) {
            throw new NotFoundException()
        }

        return rolesList
    }

    async create(role: Role): Promise<Role> {
        console.log("////////////////////////////////");
        console.log(role);

        console.log("////////////////////////////////");

        const roleCreate: Role = await this._roleRepository.save(role);

        console.log("////////////////////////////////");
        console.log(roleCreate);
        console.log("////////////////////////////////");
        return roleCreate;
    }
    async update(id: number, role: Role): Promise<Role> {
        const updateUser: UpdateResult = await this._roleRepository.update(id, role)
        // if(updateUser.affected){

        // }
        const roleUpdate = await this.getOne(id)
        return roleUpdate
    }

    async delete(id: number): Promise<void> {
        const roleExists = await this._roleRepository.findOne({
            where: { id: id, status: "ACTIVE" }
        })

        if (!roleExists) {
            throw new NotFoundException()
        }
        await this._roleRepository.update(id, {
            status: "INACTIVE"
        })
    }






}
