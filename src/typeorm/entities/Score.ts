import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'user_scores' })
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  playerName: string;

  @ManyToOne(() => User, (user) => user.scores)
  user: User;
}
