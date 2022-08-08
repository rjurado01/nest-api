import {User} from '../src/users/entities/user.entity'
import {MigrationInterface, QueryRunner} from 'typeorm'
import {plainToClass} from 'class-transformer'

export class Seed1659963363578 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = plainToClass(User, {
      id: '1',
      status: 'active',
      email: 'user1@email.com',
      role: 'admin',
    })

    queryRunner.manager.save(user)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.delete(User, {})
  }
}
