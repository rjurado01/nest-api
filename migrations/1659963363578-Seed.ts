import {AuthUser} from '../src/auth/entities/auth-user.entity'
import {MigrationInterface, QueryRunner} from 'typeorm'
import {plainToClass} from 'class-transformer'

export class Seed1659963363578 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = plainToClass(AuthUser, {
      id: '1',
      status: 'active',
      email: 'user1@email.com',
      role: 'admin',
      passwordDigest: 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', // 123456
    })

    queryRunner.manager.save(user)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.delete(AuthUser, {})
  }
}
