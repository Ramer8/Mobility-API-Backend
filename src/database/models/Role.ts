import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./User"
import { Driver } from "./Driver"

@Entity("roles")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "title" })
  title!: string

  @OneToMany(() => User, (user) => user.role)
  users!: User[]

  @OneToMany(() => Driver, (driver) => driver.role)
  drivers!: Driver[]
}
