using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace XInitiatorAPI.Migrations
{
    public partial class mg2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Memberships_Initiatives_InitiativeId",
                table: "Memberships");

            migrationBuilder.DropIndex(
                name: "IX_Memberships_InitiativeId",
                table: "Memberships");

            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "Memberships");

            migrationBuilder.AddColumn<Guid>(
                name: "InitiativeByYearId",
                table: "Memberships",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Memberships_InitiativeByYearId",
                table: "Memberships",
                column: "InitiativeByYearId");

            migrationBuilder.AddForeignKey(
                name: "FK_Memberships_InitiativesByYears_InitiativeByYearId",
                table: "Memberships",
                column: "InitiativeByYearId",
                principalTable: "InitiativesByYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Memberships_InitiativesByYears_InitiativeByYearId",
                table: "Memberships");

            migrationBuilder.DropIndex(
                name: "IX_Memberships_InitiativeByYearId",
                table: "Memberships");

            migrationBuilder.DropColumn(
                name: "InitiativeByYearId",
                table: "Memberships");

            migrationBuilder.AddColumn<Guid>(
                name: "InitiativeId",
                table: "Memberships",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Memberships_InitiativeId",
                table: "Memberships",
                column: "InitiativeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Memberships_Initiatives_InitiativeId",
                table: "Memberships",
                column: "InitiativeId",
                principalTable: "Initiatives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
