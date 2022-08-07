import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class Invitation1659796327172 implements MigrationInterface {
  private table = new Table({
    name: 'invitation',
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
        enum: ['admin', 'manager', 'normal'],
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
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
