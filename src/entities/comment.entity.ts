import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column()
  text: string;

  @ManyToOne(() => UserEntity, (author) => author.comments)
  @JoinColumn({
    name: 'authorId',
    referencedColumnName: 'id',
  })
  author: UserEntity;
}
