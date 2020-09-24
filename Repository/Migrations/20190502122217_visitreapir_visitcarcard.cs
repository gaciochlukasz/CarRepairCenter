using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Repository.Migrations
{
    public partial class visitreapir_visitcarcard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VisitCarCard",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Created = table.Column<DateTime>(nullable: true),
                    Modified = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<long>(nullable: true),
                    ModifiedBy = table.Column<long>(nullable: true),
                    GarageContextId = table.Column<long>(nullable: true),
                    AcceptanceDate = table.Column<DateTime>(nullable: false),
                    Mileage = table.Column<string>(nullable: true),
                    ReceiptDate = table.Column<DateTime>(nullable: false),
                    EstimateCost = table.Column<string>(nullable: true),
                    Valuables = table.Column<string>(nullable: true),
                    RegistrationDocument = table.Column<bool>(nullable: false),
                    OCDocument = table.Column<bool>(nullable: false),
                    KeyLeft = table.Column<bool>(nullable: false),
                    TestDriveConsent = table.Column<bool>(nullable: false),
                    UsedPatrsReturn = table.Column<bool>(nullable: false),
                    FaultDescription = table.Column<string>(nullable: true),
                    ExternalConditionDescription = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisitCarCard", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VisitRepair",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Created = table.Column<DateTime>(nullable: true),
                    Modified = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<long>(nullable: true),
                    ModifiedBy = table.Column<long>(nullable: true),
                    GarageContextId = table.Column<long>(nullable: true),
                    ClientId = table.Column<long>(nullable: false),
                    CarId = table.Column<long>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisitRepair", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VisitRepair_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VisitRepair_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VisitCarCard_GarageContextId",
                table: "VisitCarCard",
                column: "GarageContextId")
                .Annotation("SqlServer:Clustered", false);

            migrationBuilder.CreateIndex(
                name: "IX_VisitRepair_CarId",
                table: "VisitRepair",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_VisitRepair_ClientId",
                table: "VisitRepair",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_VisitRepair_GarageContextId",
                table: "VisitRepair",
                column: "GarageContextId")
                .Annotation("SqlServer:Clustered", false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VisitCarCard");

            migrationBuilder.DropTable(
                name: "VisitRepair");
        }
    }
}
