import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterRoomAddPlaylist1640047584783 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("room", new TableColumn({
            name: "playlistId",
            type: "integer"
        }));

        await queryRunner.createForeignKey("room", new TableForeignKey({
            columnNames: ["playlistId"],
            referencedColumnNames: ["id"],
            referencedTableName: "playlist",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("room");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("playlistId") !== -1);
        await queryRunner.dropForeignKey("room", foreignKey);
        await queryRunner.dropColumn("room", "paylistId");
        await queryRunner.dropTable("room");
    }

}
