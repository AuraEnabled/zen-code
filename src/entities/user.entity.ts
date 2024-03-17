import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import process from 'process';
import { hash } from 'bcrypt';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(
      this.password,
      parseInt(process.env.BCRYPT_SALT),
    );
  }
}
