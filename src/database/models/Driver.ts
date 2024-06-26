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
import { Car } from "./Car"

@Entity("drivers")
export class Driver extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "driver_name" })
  driverName!: string

  @Column({ name: "email" })
  email!: string

  @Column({ name: "password" })
  password!: string

  @Column({ name: "role_id" })
  roleId!: number

  @Column({ name: "car_id" })
  carId!: number

  @Column({ name: "phone" })
  phone!: string

  @Column({ name: "documents" })
  documents!: string

  @Column({ name: "score" })
  score!: number

  @Column({ name: "driver_message" })
  driverMessage!: string

  @Column({ name: "location" })
  location!: string

  @Column({ name: "created_at" })
  createdAt!: Date

  @ManyToOne(() => Role, (role) => role.drivers)
  @JoinColumn({ name: "role_id" })
  role!: Role
  ///
  @ManyToOne(() => Car, (car) => car.drivers)
  @JoinColumn({ name: "car_id" })
  car!: Car

  @OneToMany(() => Trip, (trip) => trip.driver)
  trips!: Trip[]
}
