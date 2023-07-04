import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ) { }


    @Post("/signUp")
    @UsePipes(ValidationPipe)
    async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
        return this._authService.signUp(signUpDto)
    }

    @Post("/signIn")
    @UsePipes(ValidationPipe)
    async signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {

        return this._authService.signIn(signInDto)
    }
}
