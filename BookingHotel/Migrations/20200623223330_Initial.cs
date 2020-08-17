using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingHotel.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sobe",
                columns: table => new
                {
                    SobeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojSobe = table.Column<int>(nullable: false),
                    TipSobe = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sobe", x => x.SobeId);
                });

            migrationBuilder.CreateTable(
                name: "Rezervacije",
                columns: table => new
                {
                    RezervacijeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojSobe = table.Column<int>(nullable: false),
                    ImeGosta = table.Column<string>(nullable: false),
                    Status = table.Column<string>(nullable: false),
                    DatumDolaska = table.Column<DateTime>(nullable: false),
                    DatumOdlaska = table.Column<DateTime>(nullable: false),
                    Sobe = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rezervacije", x => x.RezervacijeId);
                    table.ForeignKey(
                        name: "FK_Rezervacije_Sobe_Sobe",
                        column: x => x.Sobe,
                        principalTable: "Sobe",
                        principalColumn: "SobeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacije_Sobe",
                table: "Rezervacije",
                column: "Sobe");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rezervacije");

            migrationBuilder.DropTable(
                name: "Sobe");
        }
    }
}
