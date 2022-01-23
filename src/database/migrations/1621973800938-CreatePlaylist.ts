import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreatePlaylist1621973800938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "playlist",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "currentPlaying",
            type: "varchar"
          }
        ]}),
      true
    );

    await queryRunner.createIndex(
      "playlist",
      new TableIndex({
        name: "IDX_PLAYLIST_ID",
        columnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("playlist", "IDX_PLAYLIST_ID");
    await queryRunner.dropTable("playlist");
  }
}
