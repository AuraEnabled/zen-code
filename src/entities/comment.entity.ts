import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ nullable: true })
  replyToId: number;

  @ManyToOne(() => UserEntity, (author) => author.comments)
  @JoinColumn({
    name: 'authorId',
    referencedColumnName: 'id',
  })
  author: UserEntity;

  @OneToMany(() => CommentEntity, (reply) => reply.replyTo)
  replies: CommentEntity[];

  @ManyToOne(() => CommentEntity, (replyTo) => replyTo.replies)
  @JoinColumn({
    name: 'replyToId',
    referencedColumnName: 'id',
  })
  replyTo: CommentEntity;
}
