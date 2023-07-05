import { Controller, Param, Get, Post, Body, Patch, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CreateRoleDTO, ReadRoleDTO } from './dto';


@Controller('roles')
export class RoleController {
    constructor(
        private readonly _roleService: RoleService
    ) {

    }

    @Get(":id")
    async getRole(@Param("id", ParseIntPipe) id: number): Promise<ReadRoleDTO> {
        const user: ReadRoleDTO = await this._roleService.getOne(id)
        return user
    }

    @Get()
    async getAllRoles(): Promise<ReadRoleDTO[]> {
        const users: ReadRoleDTO[] = await this._roleService.getAll()
        return users
    }

    @Post()
    async createUser(@Body() role: Role): Promise<ReadRoleDTO> {
        try {
            const createdRole: ReadRoleDTO = await this._roleService.create(role)
            return createdRole
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error.message ? error.message : "Internal error")
        }
    }

    @Patch(":id")
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() role: Role): Promise<ReadRoleDTO> {
        try {
            const updateRole: ReadRoleDTO = await this._roleService.update(id, role)
            return updateRole
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }

    @Delete(":id")
    async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<Object> {
        try {
            await this._roleService.delete(id)
            return {
                message: "Role deleted"
            }
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
}
