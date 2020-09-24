using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Repository.Migrations
{
    public partial class niewiem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Garages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nip",
                table: "Garages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Garages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Regon",
                table: "Garages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Garages");

            migrationBuilder.DropColumn(
                name: "Nip",
                table: "Garages");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Garages");

            migrationBuilder.DropColumn(
                name: "Regon",
                table: "Garages");
        }
    }
}
