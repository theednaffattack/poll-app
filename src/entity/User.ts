import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne
} from "typeorm";
import { Profile } from "./Profile";
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

  @Column({ nullable: true })
  profileId: number;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
