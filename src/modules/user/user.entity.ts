import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinTable,
    ManyToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"
import { UserDetails } from "./user.details.entity";
import { Role } from "../role/role.entity";
import { EStatusUser } from "./interfaces/status-user.interface";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", unique: true, length: 25, nullable: false })
    username: string

    @Column({ type: "varchar", unique: true, length: 50, nullable: false })
    email: string

    @Column({ type: "varchar", nullable: false })
    password: string

    @OneToOne((type) => UserDetails, { cascade: true, nullable: false, eager: true })
    @JoinColumn({ name: "detail_id" })
    details: UserDetails

    @ManyToMany((type) => Role, (role) => role.users, { eager: true })
    @JoinTable({ name: "user_roles" })
    roles: Role[]

    @Column({ type: "varchar", default: EStatusUser.ACTIVE, length: 8 })
    status: string

    @CreateDateColumn({ type: "timestamp", name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date
}