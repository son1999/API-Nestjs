import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false})
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToMany(type => User, user => user.roles)
  @JoinColumn()
  users: User[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @Column({ type: 'timestamp', name: 'created_at', nullable: true })
  createAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at', nullable: true })
  updateAt: Date;
}
