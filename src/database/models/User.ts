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
import { Trip } from "./Trip"

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "user_name" })
  userName!: string

  @Column({ name: "email" })
  email!: string

  @Column({ name: "password" })
  password!: string

  @Column({ name: "phone" })
  phone!: string

  @Column({ name: "payment" })
  payment!: string

  @Column({ name: "address" })
  address!: string

  @Column({ name: "work_address" })
  workAddress!: string

  @Column({ name: "saved_address" })
  savedAddress!: string

  @Column({ name: "documents" })
  documents!: string

  @Column({ name: "message" })
  message!: string

  @Column({ name: "role_id" })
  roleId!: number

  @Column({ name: "location" })
  location!: string

  @Column({ name: "created_at" })
  createdAt!: Date

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role
  ///
  @OneToMany(() => Trip, (trip) => trip.user)
  trips!: Trip[]
  //added this relation to trip and more
}
