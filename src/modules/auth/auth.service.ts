import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from "@nestjs/jwt"
import { SignUpDto } from './dto';
import { SignInDto } from './dto/signin.dto';
import { User } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { RoleType } from '../role/roletype.enum';


@Injectable()
export class AuthService {
    constructor(
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService,
    ) {

    }


    async signUp(signUp: SignUpDto): Promise<void> {
        const { username, email } = signUp

        const userExists = await this._authRepository.findOne({
            where: [{ username: username, }, { email: email }]
        })

        if (userExists) {
            throw new ConflictException("username or email already exists")
        }

        return this._authRepository.signUp(signUp)
    }

    async signIn(signIn: SignInDto): Promise<{ token: string }> {
        const { username, password } = signIn


        const user: User = await this._authRepository.findOne({
            where: [
                { username: username },
                { email: username },
            ]
        })

        if (!user) {
            throw new NotFoundException("User does not exist")
        }

        const isMath = await compare(password, user.password)

        if (!isMath) {
            throw new NotFoundException("invalid credentials")
        }

        const payload: IJwtPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles.map(r => r.name as RoleType),
        }

        const token = await this._jwtService.sign(payload)
        return {
            token: token,
        }
    }
}
