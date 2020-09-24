using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Repository.Migrations
{
    public partial class add_desc_vr_partsprice_sl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "ServiceList",
                newName: "ServicePrice");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "VisitRepair",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartsPrice",
                table: "ServiceList",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "VisitRepair");

            migrationBuilder.DropColumn(
                name: "PartsPrice",
                table: "ServiceList");

            migrationBuilder.RenameColumn(
                name: "ServicePrice",
                table: "ServiceList",
                newName: "Price");
        }
    }
}
