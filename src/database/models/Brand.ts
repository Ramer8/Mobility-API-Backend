import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Car } from "./Car"

@Entity("brands")
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "name" })
  name!: string

  @Column({ name: "nationality" })
  nationality!: string

  @OneToMany(() => Car, (car) => car.brand)
  cars!: Car[]
}

///
