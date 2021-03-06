import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { PollOption } from "./PollOption";
import { User } from "./User";
@Entity()
export class Poll extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  name: string;

  @OneToMany(() => PollOption, pollOption => pollOption.pollId)
  @JoinColumn()
  options: PollOption[];

  @ManyToOne(() => User, user => user.polls)
  createdBy: User;
}
