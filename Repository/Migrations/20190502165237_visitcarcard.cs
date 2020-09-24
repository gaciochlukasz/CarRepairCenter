using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Repository.Migrations
{
    public partial class visitcarcard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "VisitCarCardId",
                table: "VisitRepair",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_VisitRepair_VisitCarCardId",
                table: "VisitRepair",
                column: "VisitCarCardId");

            migrationBuilder.AddForeignKey(
                name: "FK_VisitRepair_VisitCarCard_VisitCarCardId",
                table: "VisitRepair",
                column: "VisitCarCardId",
                principalTable: "VisitCarCard",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VisitRepair_VisitCarCard_VisitCarCardId",
                table: "VisitRepair");

            migrationBuilder.DropIndex(
                name: "IX_VisitRepair_VisitCarCardId",
                table: "VisitRepair");

            migrationBuilder.DropColumn(
                name: "VisitCarCardId",
                table: "VisitRepair");
        }
    }
}
