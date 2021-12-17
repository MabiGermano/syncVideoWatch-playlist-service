import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateVideo1621996482477 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(new Table({
            name: 'video',
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
                    name:'title',
                    type: 'varchar'
                },
                {
                    name:'author_name',
                    type: 'varchar'
                }, 
                {
                    name:'thumbnailImage',
                    type: 'varchar'
                }, 
                {
                    name:'videoCode',
                    type: 'varchar'
                }, 
                {
                    name:'playlist_id',
                    type: 'integer'
                }

            ],
            foreignKeys: [
                {
                  name: 'Playlist',
                  columnNames: ['playlist_id'],
                  referencedTableName: 'playlist',
                  referencedColumnNames: ['id'],
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
                }
              ]
        }), true)

        await queryRunner.createIndex('video', new TableIndex({
            name: 'IDX_VIDEO_ID',
            columnNames: ['id']
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('video', 'IDX_VIDEO_ID')
        await queryRunner.dropTable('video')
    }

}
