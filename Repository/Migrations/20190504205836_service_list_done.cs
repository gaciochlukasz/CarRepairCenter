using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Repository.Migrations
{
    public partial class service_list_done : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Done",
                table: "ServiceList",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Done",
                table: "ServiceList");
        }
    }
}
