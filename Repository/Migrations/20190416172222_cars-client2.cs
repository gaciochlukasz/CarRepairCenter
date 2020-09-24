using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Repository.Migrations
{
    public partial class carsclient2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BirthDay",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FlatNo",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HouseNo",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Pesel",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostCode",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressOwner",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CarBrand",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CarName",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CarType",
                table: "Cars",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CarWeight",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ClientId",
                table: "Cars",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "EngineCapacity",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnginePower",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstRegisterDate",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FuelType",
                table: "Cars",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "NameOwner",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PeselOrRegonOwner",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RegistrationNo",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VinNo",
                table: "Cars",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Cars_ClientId",
                table: "Cars",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Clients_ClientId",
                table: "Cars",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Clients_ClientId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_ClientId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "BirthDay",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "FlatNo",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "HouseNo",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Pesel",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "PostCode",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "AddressOwner",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarBrand",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarName",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarType",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarWeight",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "EngineCapacity",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "EnginePower",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "FirstRegisterDate",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "FuelType",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "NameOwner",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "PeselOrRegonOwner",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "RegistrationNo",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "VinNo",
                table: "Cars");
        }
    }
}
