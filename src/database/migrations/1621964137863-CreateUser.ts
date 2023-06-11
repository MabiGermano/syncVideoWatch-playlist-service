import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUser1621964137863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
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
                },
                {
                    name: "nickname",
                    type: "varchar",
                },
                {
                    name: "roomAdmin",
                    type: "boolean",
                    default: false
                },
                {
                    name: "roomId",
                    type: "integer",
                }
            ],
            foreignKeys: [
                {
                  name: 'Room',
                  columnNames: ['roomId'],
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
        await queryRunner.dropIndex('user', 'IDX_USER_NICKNAME')
        await queryRunner.dropTable('user')
    }

}
