import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from "typeorm";

import { Poll } from "./Poll";
import { User } from "./User";

@Entity()
export class PollOption extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "int", nullable: true })
  votes: number;

  @ManyToOne(() => User, user => user.pollOptions)
  createdBy: User["id"];

  @ManyToOne(() => Poll, poll => poll.options)
  pollId: Poll["id"];
}
