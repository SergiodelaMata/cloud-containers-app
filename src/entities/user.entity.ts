import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn("varchar", { length: 100 })
  userId: string;

  @Column("varchar", {length: 100 })
  name: string;

  @Column("varchar", {length: 100 })
  first-surname: string;

  @Column("varchar", {length: 100 })
  second-surname: string;

  @Column("varchar", {length: 9, unique: true })
  telephone: string;

  @Column("varchar", {length: 60, unique: true })
  email: string;

  @Column("varchar", { length: 16, unique: true })
  credit-card: string;

  @Column("datetime")
  expire-date-credit-card: Date;

}
