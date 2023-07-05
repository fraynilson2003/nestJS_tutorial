import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { RoleType } from './roletype.enum';
import { EstatusRole } from './interfaces/status-role.interface';

@Entity("roles")
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 25, nullable: false })
    name: RoleType

    @Column({ type: "text", nullable: false })
    description: string

    @ManyToMany((type) => User, (user) => user.roles)
    @JoinTable({ name: "user_roles" })
    users: User[]

    @Column({ type: "varchar", default: EstatusRole.ACTIVE, length: 8 })
    status: string

    @CreateDateColumn({ type: "timestamp", name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date
}