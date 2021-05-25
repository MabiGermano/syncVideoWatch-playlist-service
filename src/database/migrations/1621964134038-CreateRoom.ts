import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateRoom1621964134038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'room',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'identifier',
                    type: 'varchar',
                }
            ]
        }), true)

        await queryRunner.createIndex('room', new TableIndex({
            name: 'IDX_ROOM_IDENTIFIER',
            columnNames: ['identifier']
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('room')
    }

}
