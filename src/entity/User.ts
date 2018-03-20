import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() age: number;

  @Column({ type: "boolean", default: false })
  confirmed: boolean;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;
}
