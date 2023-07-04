import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { DataSource, Repository, getConnection } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { UserDetails } from '../user/user.details.entity';
import { genSalt, hash } from 'bcryptjs';



@Injectable()
export class AuthRepository extends Repository<User> {
    constructor(
        private dataSource: DataSource,
    ) {
        super(User, dataSource.createEntityManager());
    }

    async signUp(signUpDto: SignUpDto) {
        const { username, email, password } = signUpDto
        const user = new User()
        user.username = username
        user.email = email
        user.password = password

        const roleRepository: Repository<Role> = this.dataSource.getRepository(Role)
        const defaultRole: Role = (await roleRepository.findOne({ where: { name: RoleType.GENERAL } }))

        user.roles = [defaultRole]

        const details = new UserDetails()

        user.details = details

        const salt = await genSalt(10)
        user.password = await hash(password, salt)

        await user.save()
    }

}