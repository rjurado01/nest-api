import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class User1659278411385 implements MigrationInterface {
  private table = new Table({
    name: 'user',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'increment',
      },
      {
        name: 'role',
        type: 'enum',
        enum: ['admin', 'manager', 'normal'],
      },
      {
        name: 'status',
        type: 'enum',
        enum: ['invited', 'active', 'disabled'],
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
        name: 'invitation_token',
        type: 'varchar',
        isNullable: true,
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
