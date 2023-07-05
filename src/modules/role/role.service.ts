import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Role } from '../role/role.entity';
import { RoleRepository } from './role.repository';
import { EstatusRole } from './interfaces/status-role.interface';
import { CreateRoleDTO, ReadRoleDTO, UpdateRoleDTO } from './dto';
import { plainToInstance, instanceToInstance, plainToClass } from "class-transformer"

@Injectable()
export class RoleService {
    constructor(
        //@InjectRepository(User)
        private readonly _roleRepository: RoleRepository,
    ) {

    }

    async getOne(id: number): Promise<ReadRoleDTO> {
        if (!id) {
            throw new BadRequestException("id must be sent")
        }

        const role: Role = await this._roleRepository.findOne({
            where: { id: id }
        }).catch(err => { throw new Error(err) })

        if (!role) {
            throw new NotFoundException()
        }

        return plainToInstance(ReadRoleDTO, role)
    }


    async getAll(count: number = 20): Promise<ReadRoleDTO[]> {

        const rolesList: Role[] = await this._roleRepository.find({
            take: count,
            where: { status: EstatusRole.ACTIVE }
        })

        if (!rolesList.length) {
            throw new NotFoundException()
        }

        return plainToInstance(ReadRoleDTO, rolesList)
    }

    async create(roleDTO: CreateRoleDTO): Promise<ReadRoleDTO> {

        const newRole: Role = plainToClass(Role, roleDTO)
        const roleCreate: Role = await this._roleRepository.save(newRole);


        return plainToInstance(ReadRoleDTO, roleCreate);
    }
    async update(id: number, roleDTO: Partial<UpdateRoleDTO>): Promise<ReadRoleDTO> {

        const newRole: Role = plainToClass(Role, roleDTO)

        const updateUser: UpdateResult = await this._roleRepository.update(id, newRole)
        // if(updateUser.affected){

        // }
        const roleUpdate = await this.getOne(id)
        return roleUpdate
    }

    async delete(id: number): Promise<void> {
        const roleExists = await this._roleRepository.findOne({
            where: { id: id, status: EstatusRole.ACTIVE }
        })

        if (!roleExists) {
            throw new NotFoundException()
        }
        await this._roleRepository.update(id, {
            status: EstatusRole.INACTIVE
        })
    }






}
