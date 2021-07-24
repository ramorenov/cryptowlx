import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";

@Entity()
@Unique(["coin_id", "user_id"])
export class Coin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  coin_id: string;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user_id: string;
}
