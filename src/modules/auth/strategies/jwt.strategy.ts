import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UnauthorizedException, Injectable } from '@nestjs/common';

import { AuthRepository } from "../auth.repository";
import { EStatusUser } from '../../user/interfaces/status-user.interface';
import { ConfigService } from '../../../config/config.service';
import { Configuration } from '../../../config/config.keys';
import { IJwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _configService: ConfigService,
        private readonly _auhtRepository: AuthRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get(Configuration.JWT_SECRET),
            ignoreExpiration: false,
        })
    }

    async validate(payload: IJwtPayload) {

        const { username } = payload
        const user = this._auhtRepository.findOne({
            where: {
                username: username,
                status: EStatusUser.ACTIVE
            }
        });

        if (!user) {
            throw new UnauthorizedException()
        }

        return payload
    }
}