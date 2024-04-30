import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Role } from "./Role"

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "user_name" })
  firstName!: string

  @Column({ name: "email" })
  email!: string

  @Column({ name: "password_hash" })
  password!: string

  @Column({ name: "created_at" })
  createdAt!: Date

  @Column({ name: "role_id" })
  roleId!: number

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role
  ///
  //   @OneToMany(() => Appointment, (meet) => meet.user)
  //   appointments!: Appointment[]
  //added this relation to drivers and more
}
