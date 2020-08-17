﻿// <auto-generated />
using System;
using BookingHotel.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BookingHotel.Migrations
{
    [DbContext(typeof(RezervacijeContext))]
    [Migration("20200726160915_RemoveStatus")]
    partial class RemoveStatus
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BookingHotel.Models.Rezervacije", b =>
                {
                    b.Property<int>("RezervacijeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BrojSobe")
                        .HasColumnType("int");

                    b.Property<DateTime>("DatumDolaska")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumOdlaska")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImeGosta")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Sobe")
                        .HasColumnType("int");

                    b.HasKey("RezervacijeId");

                    b.HasIndex("Sobe");

                    b.ToTable("Rezervacije");
                });

            modelBuilder.Entity("BookingHotel.Models.Sobe", b =>
                {
                    b.Property<int>("SobeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BrojSobe")
                        .HasColumnType("int");

                    b.Property<string>("TipSobe")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SobeId");

                    b.ToTable("Sobe");
                });

            modelBuilder.Entity("BookingHotel.Models.Rezervacije", b =>
                {
                    b.HasOne("BookingHotel.Models.Sobe", "Soba")
                        .WithMany()
                        .HasForeignKey("Sobe");
                });
#pragma warning restore 612, 618
        }
    }
}
