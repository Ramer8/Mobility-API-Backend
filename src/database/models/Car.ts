import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Brand } from "./Brand"
import { Trip } from "./Trip"

@Entity("Cars")
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "model" })
  model!: string

  @Column({ name: "power_engine" })
  powerEngine!: string

  @Column({ name: "seats" })
  seats!: string

  @Column({ name: "accessible_car" })
  accessibleCar!: string

  @Column({ name: "created_at" })
  created_at!: string

  @Column({ name: "brand_id" })
  brandId!: string

  @ManyToOne(() => Brand, (brand) => brand.cars)
  @JoinColumn({ name: "brand_id" })
  brand!: Brand[]

  @OneToMany(() => Trip, (trip) => trip.car)
  trips!: Trip[]
}
