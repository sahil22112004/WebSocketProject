import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserSessionMigration1770197704394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "userSessions",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true,
                            generationStrategy: "uuid",
                            default: "uuid_generate_v4()",
                        },
                        {
                            name: "userId",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "sessionId",
                            type: "varchar",
                            isNullable: true,
    
                        },
                        {
                            name: "createdAt",
                            type: "varchar",
                            default: 'NOW()',
                            isNullable: false,
                        },
                        {
                            name: "updatedAt",
                            type: "varchar",
                            default: 'NOW()',
                            isNullable: false,
                        }
                    ]
                }),
                true
            );
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("userSessions");
        }
    
    }