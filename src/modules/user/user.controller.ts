import { Controller, Param, Get, Post, Body, Patch, Delete, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { DRoles } from './decorators/role.decorator';
import { RoleType } from '../role/roletype.enum';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('users')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ) {

    }

    @Get(":id")
    @DRoles(RoleType.ADMIN, RoleType.GENERAL)
    @UseGuards(AuthGuard(), RoleGuard)
    async getUser(@Param("id", ParseIntPipe) id: number): Promise<User> {
        const user = await this._userService.getOne(id)
        return user
    }

    @UseGuards(AuthGuard())
    @Get()
    async getAllUsers(): Promise<User[]> {
        const users = await this._userService.getAll()
        return users
    }

    @Post()
    async createUser(@Body() user: User): Promise<User> {
        try {
            const createdUser = await this._userService.create(user)
            return createdUser
        } catch (error) {
            console.log(error);

            throw new Error(error)
        }

    }

    @UseGuards(AuthGuard())
    @Post("/setRole/:userId/:roleId")
    async addRoleToUser(
        @Param("userId", ParseIntPipe) userId: number,
        @Param("roleId", ParseIntPipe) roleId: number): Promise<boolean> {

        return this._userService.setRoleToUser(userId, roleId)

    }

    @Patch(":id")
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: User): Promise<User> {
        const createdUser = await this._userService.update(id, user)
        return createdUser
    }

    @Delete(":id")
    async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
        await this._userService.delete(id).catch(err => {
            throw new NotFoundException()
        })
        return true
    }
}
