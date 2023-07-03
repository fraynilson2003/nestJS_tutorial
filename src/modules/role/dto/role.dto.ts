import { IsNotEmpty } from "class-validator";

export class RoleDto {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    description: string


}