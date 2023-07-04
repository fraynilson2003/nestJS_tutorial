import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { User } from "./user.entity";
import { EStatusUser } from "./interfaces/status-user.interface";

@Entity("user_details")
export class UserDetails extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 50, nullable: true })
    name: string

    @Column({ type: "varchar", nullable: true })
    lastname: string

    @Column({ type: "varchar", default: EStatusUser.ACTIVE, length: 8 })
    status: EStatusUser

    // @OneToOne((type) => User, { cascade: true, nullable: false, eager: true })
    // @JoinColumn({ name: "user_id" })
    // user: User

    @CreateDateColumn({ type: "timestamp", name: "created_at", nullable: true })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", name: "updated_at", nullable: true })
    updatedAt: Date
}