import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Driver } from "./Driver"
import { User } from "./User"
import { Car } from "./Car"

@Entity("trips")
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "user_id" })
  userId!: number

  @Column({ name: "car_id" })
  carId!: number

  @Column({ name: "driver_id" })
  driverId!: number

  @Column({ name: "start_location" })
  startLocation!: Date

  @Column({ name: "destination" })
  destination!: string

  @Column({ name: "trip_date" })
  tripDate!: Date

  @Column({ name: "trip_start_date" })
  tripStartDate!: Date

  @Column({ name: "trip_finish_date" })
  tripFinishDate!: Date

  @ManyToOne(() => Driver, (driver) => driver.trips)
  @JoinColumn({ name: "driver_id" })
  driver!: Driver

  @ManyToOne(() => User, (user) => user.trips)
  @JoinColumn({ name: "user_id" })
  user!: User

  @ManyToOne(() => Car, (car) => car.trips)
  @JoinColumn({ name: "car_id" })
  car!: Car
}
