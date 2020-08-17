using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingHotel.Migrations
{
    public partial class RemoveStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Rezervacije");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Rezervacije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
