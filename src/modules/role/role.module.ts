import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { SharedModule } from 'src/shared/shared.module';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
        SharedModule
    ],
    providers: [RoleService, RoleRepository],
    controllers: [RoleController]


})




export class RoleModule {

}
