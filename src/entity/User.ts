import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  // JoinColumn,
  OneToMany
} from "typeorm";

import { Poll } from "./Poll";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "boolean", default: false })
  confirmed: boolean;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  username: string;

  @Column({ type: "text" })
  password: string;

  @OneToMany(() => Poll, poll => poll.createdBy)
  polls: Poll[];
}
