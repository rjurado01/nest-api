import {USER_ROLES, USER_STATUSES} from 'src/users/users.constants'
import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class User1659278411385 implements MigrationInterface {
  private table = new Table({
    name: 'user',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        length: '255',
        isPrimary: true,
        generationStrategy: 'increment',
      },
      {
        name: 'role',
        type: 'enum',
        enum: Object.values(USER_ROLES),
      },
      {
        name: 'status',
        type: 'enum',
        enum: Object.values(USER_STATUSES),
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isUnique: true,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        default: 'now()',
      },
      {
        name: 'password_digest',
        type: 'varchar',
        isNullable: true,
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
