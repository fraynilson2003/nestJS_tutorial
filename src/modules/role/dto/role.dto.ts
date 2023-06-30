import { IsNotEmpty } from "class-validator";
import { RoleType } from "src/modules/role/roletype.enum";

export class UserDto {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()

    description: string



}