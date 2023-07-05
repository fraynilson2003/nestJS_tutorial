import { Exclude, Expose } from "class-transformer"
import { IsNumber, IsString, MaxLength } from "class-validator"

@Exclude()
export class ReadRoleDTO {
    @Expose()
    @IsNumber()
    readonly id: number

    @Expose()
    @IsString()
    @MaxLength(30, { message: "This name is not valid" })
    readonly name: string

    @Expose()
    @IsString()
    @MaxLength(150, { message: "This description is not valid" })
    readonly description: string
}