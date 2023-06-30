import { Controller, Param, Get, Post, Body, Patch, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ) {

    }

    @Get(":id")
    async getUser(@Param("id", ParseIntPipe) id: number): Promise<UserDto> {
        const user = await this._userService.getOne(id)
        return user
    }

    @Get()
    async getAllUsers(): Promise<UserDto[]> {
        const users = await this._userService.getAll()
        return users
    }

    @Post()
    async createUser(@Body() user: User): Promise<UserDto> {
        try {
            const createdUser = await this._userService.create(user)
            return createdUser
        } catch (error) {
            console.log(error);

            throw new Error(error)
        }

    }

    @Patch(":id")
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: User): Promise<UserDto> {
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
