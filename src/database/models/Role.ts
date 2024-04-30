import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./User"

@Entity("roles")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "title" })
  title!: string

  @OneToMany(() => User, (user) => user.role)
  users!: User[]
  //   @OneToMany(() => User, (user) => user.role)
  //   users!: User[] //add this relation to driver model
}
