import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from "typeorm";

import { Poll } from "./Poll";

@Entity()
export class PollOption extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "int" })
  votes: number;

  @ManyToOne(() => Poll, poll => poll.options)
  pollId: Poll;
}
