using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Repository.Migrations
{
    public partial class basemodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Garage_GarageContextId",
                table: "Garage",
                column: "GarageContextId")
                .Annotation("SqlServer:Clustered", false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Garage_GarageContextId",
                table: "Garage");
        }
    }
}
