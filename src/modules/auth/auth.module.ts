import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { AuthRepository } from './auth.repository';
import { ConfigService } from 'src/config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config.module';
import { config } from 'dotenv';
import { Configuration } from '../../config/config.keys';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: "jwt"
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule,],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: 3600
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, ConfigService, JwtStrategy],

  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
