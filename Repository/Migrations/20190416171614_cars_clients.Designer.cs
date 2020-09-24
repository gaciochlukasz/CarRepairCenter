﻿// <auto-generated />
using System;
using Api.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Api.Repository.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20190416171614_cars_clients")]
    partial class cars_clients
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Api.Repository.Models.Cars", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("Created");

                    b.Property<long?>("CreatedBy");

                    b.Property<long?>("GarageContextId");

                    b.Property<DateTime?>("Modified");

                    b.Property<long?>("ModifiedBy");

                    b.HasKey("Id");

                    b.HasIndex("GarageContextId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("Api.Repository.Models.Clients", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("Created");

                    b.Property<long?>("CreatedBy");

                    b.Property<long?>("GarageContextId");

                    b.Property<DateTime?>("Modified");

                    b.Property<long?>("ModifiedBy");

                    b.HasKey("Id");

                    b.HasIndex("GarageContextId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("Api.Repository.Models.Garage", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<DateTime?>("Created");

                    b.Property<long?>("CreatedBy");

                    b.Property<string>("Email");

                    b.Property<long?>("GarageContextId");

                    b.Property<DateTime?>("Modified");

                    b.Property<long?>("ModifiedBy");

                    b.Property<string>("Name");

                    b.Property<string>("Nip");

                    b.Property<string>("Nr");

                    b.Property<string>("Phone");

                    b.Property<string>("Regon");

                    b.Property<string>("Street");

                    b.HasKey("Id");

                    b.HasIndex("GarageContextId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.ToTable("Garages");
                });

            modelBuilder.Entity("Api.Repository.Models.Person", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("Created");

                    b.Property<long?>("CreatedBy");

                    b.Property<string>("Email");

                    b.Property<long?>("GarageContextId");

                    b.Property<string>("LastName");

                    b.Property<DateTime?>("Modified");

                    b.Property<long?>("ModifiedBy");

                    b.Property<string>("Name");

                    b.Property<int>("PersonType");

                    b.Property<string>("PhoneNumber");

                    b.HasKey("Id");

                    b.HasIndex("GarageContextId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("Api.Repository.Models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("Created");

                    b.Property<long?>("CreatedBy");

                    b.Property<string>("Email");

                    b.Property<long?>("GarageContextId");

                    b.Property<DateTime?>("Modified");

                    b.Property<long?>("ModifiedBy");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<long>("PersonId");

                    b.HasKey("Id");

                    b.HasIndex("GarageContextId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.HasIndex("PersonId")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Api.Repository.Models.User", b =>
                {
                    b.HasOne("Api.Repository.Models.Person")
                        .WithOne("User")
                        .HasForeignKey("Api.Repository.Models.User", "PersonId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
