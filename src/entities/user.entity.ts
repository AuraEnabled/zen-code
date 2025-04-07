import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as process from 'process';
import { hash } from 'bcrypt';
import { CommentEntity } from './comment.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: CommentEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(
      this.password,
      parseInt(process.env.BCRYPT_SALT),
    );
  }
}
