import { Controller, Param, Get, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { RoleService } from './role.service';
import { Role } from './role.entity';


@Controller('roles')
export class RoleController {
    constructor(
        private readonly _roleService: RoleService
    ) {

    }

    @Get(":id")
    async getRole(@Param("id", ParseIntPipe) id: number): Promise<Role> {
        const user: Role = await this._roleService.getOne(id)
        return user
    }

    @Get()
    async getAllRoles(): Promise<RoleDto[]> {
        const users: Role[] = await this._roleService.getAll()
        return users
    }

    @Post()
    async createUser(@Body() role: Role): Promise<Role> {
        try {
            const createdRole: Role = await this._roleService.create(role)
            return createdRole
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }

    @Patch(":id")
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() role: Role): Promise<Role> {
        try {
            const updateRole: Role = await this._roleService.update(id, role)
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
                message: "User deleted"
            }
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
}
