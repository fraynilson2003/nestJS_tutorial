import { IsString, MaxLength } from "class-validator"

export class CreateRoleDTO {
    @IsString()
    @MaxLength(100, { message: "This name is not valid" })
    readonly name: string

    @IsString()
    @MaxLength(150, { message: "This description is not valid" })
    readonly description: string


}