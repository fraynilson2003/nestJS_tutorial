import { createParamDecorator } from "@nestjs/common";
import { UserDto } from "src/modules/user/dto/user.dto";

export const GetUser = createParamDecorator((data, req): UserDto => {
    return req.user
})