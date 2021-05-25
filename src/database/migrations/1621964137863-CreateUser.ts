import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUser1621964137863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "question",
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
                    name: "nickname",
                    type: "varchar",
                },
                {
                    name: "room_id",
                    type: "integer",
                }
            ],
            foreignKeys: [
                {
                  name: 'Room',
                  columnNames: ['room_id'],
                  referencedTableName: 'room',
                  referencedColumnNames: ['id'],
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
        
                }
              ]
        }), true)

        await queryRunner.createIndex('user', new TableIndex({
            name: 'IDX_USER_NICKNAME',
            columnNames: ['nickname']
        }));
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('user', 'IDX_USER_NICKNAME');
    }

}
