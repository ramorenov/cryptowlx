import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  id: string;
  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  pref_currency: string;
}
