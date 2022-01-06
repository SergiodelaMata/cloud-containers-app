import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "product" })
export class ProductEntity {
  @PrimaryColumn("varchar", { length: 100 })
  productId: string;

  @Column("varchar", {length: 100 })
  name: string;

  @Column("varchar", {length: 500, unique: true })
  description: string;

  @Column("longtext")
  image: string;

}
