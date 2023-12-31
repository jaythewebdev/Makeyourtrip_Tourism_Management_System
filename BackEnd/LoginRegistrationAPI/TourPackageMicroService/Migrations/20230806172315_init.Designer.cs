﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TourPackageMicroservice.Models.Context;

#nullable disable

namespace TourPackageMicroService.Migrations
{
    [DbContext(typeof(TourContext))]
    [Migration("20230806172315_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Destination", b =>
                {
                    b.Property<int>("DestinationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DestinationId"), 1L, 1);

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DestinationCityName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("DestinationId");

                    b.HasIndex("DestinationCityName")
                        .IsUnique();

                    b.ToTable("Destinations");
                });

            modelBuilder.Entity("TourDestination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("DestinationActivity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DestinationId")
                        .HasColumnType("int");

                    b.Property<string>("Destinationimage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TourId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DestinationId");

                    b.HasIndex("TourId");

                    b.ToTable("TourDestinations");
                });

            modelBuilder.Entity("TourExclusion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("ExclusionId")
                        .HasColumnType("int");

                    b.Property<int>("TourId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExclusionId");

                    b.HasIndex("TourId");

                    b.ToTable("TourExclusions");
                });

            modelBuilder.Entity("TourInclusion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("InclusionId")
                        .HasColumnType("int");

                    b.Property<int>("TourId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("InclusionId");

                    b.HasIndex("TourId");

                    b.ToTable("TourInclusions");
                });

            modelBuilder.Entity("TourPackageMicroService.Models.DailySchedule", b =>
                {
                    b.Property<int>("ScheduleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ScheduleId"), 1L, 1);

                    b.Property<string>("Activity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ItineraryId")
                        .HasColumnType("int");

                    b.Property<string>("Place")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Timing")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ScheduleId");

                    b.HasIndex("ItineraryId");

                    b.ToTable("DailySchedules");
                });

            modelBuilder.Entity("TourPackageMicroservice.Models.Exclusions", b =>
                {
                    b.Property<int>("ExclusionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ExclusionId"), 1L, 1);

                    b.Property<string>("ExclusionDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("ExclusionId");

                    b.HasIndex("ExclusionDescription")
                        .IsUnique();

                    b.ToTable("Exclusions");
                });

            modelBuilder.Entity("TourPackageMicroservice.Models.Inclusions", b =>
                {
                    b.Property<int>("InclusionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("InclusionId"), 1L, 1);

                    b.Property<string>("InclusionDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("InclusionId");

                    b.HasIndex("InclusionDescription")
                        .IsUnique();

                    b.ToTable("Inclusions");
                });

            modelBuilder.Entity("TourPackageMicroService.Models.Itinerary", b =>
                {
                    b.Property<int>("ItineraryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ItineraryId"), 1L, 1);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("DayNumber")
                        .HasColumnType("int");

                    b.Property<int>("DestinationId")
                        .HasColumnType("int");

                    b.Property<int>("TourId")
                        .HasColumnType("int");

                    b.HasKey("ItineraryId");

                    b.HasIndex("DestinationId");

                    b.HasIndex("TourId");

                    b.ToTable("Itineraries");
                });

            modelBuilder.Entity("TourPackageMicroService.Models.PickupPoint", b =>
                {
                    b.Property<int>("PickupPointId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PickupPointId"), 1L, 1);

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("PickupTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("TourId")
                        .HasColumnType("int");

                    b.HasKey("PickupPointId");

                    b.HasIndex("TourId");

                    b.ToTable("PickupPoints");
                });

            modelBuilder.Entity("TourPackageMicroservice.Models.TourDetails", b =>
                {
                    b.Property<int>("TourId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TourId"), 1L, 1);

                    b.Property<string>("AccomodationStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Availability")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("BookedCapacity")
                        .HasColumnType("int");

                    b.Property<int>("BookingRestriction")
                        .HasColumnType("int");

                    b.Property<string>("CancellationPolicy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DepartureDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("HealthAndSafety")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MaxCapacity")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("TourDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TourName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("TourPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Tourtype")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TravelAgentId")
                        .HasColumnType("int");

                    b.HasKey("TourId");

                    b.ToTable("TourDetails");
                });

            modelBuilder.Entity("TourDestination", b =>
                {
                    b.HasOne("Destination", "Destination")
                        .WithMany("TourDestinations")
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TourPackageMicroservice.Models.TourDetails", "Tour")
                        .WithMany("TourDestination")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Destination");

                    b.Navigation("Tour");
                });

            modelBuilder.Entity("TourExclusion", b =>
                {
                    b.HasOne("TourPackageMicroservice.Models.Exclusions", "Exclusions")
                        .WithMany("TourExclusion")
                        .HasForeignKey("ExclusionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TourPackageMicroservice.Models.TourDetails", "TourDetails")
                        .WithMany("TourExclusion")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exclusions");

                    b.Navigation("TourDetails");
                });

            modelBuilder.Entity("TourInclusion", b =>
                {
                    b.HasOne("TourPackageMicroservice.Models.Inclusions", "Inclusions")
                        .WithMany("TourInclusion")
                        .HasForeignKey("InclusionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TourPackageMicroservice.Models.TourDetails", "Tour")
                        .WithMany("TourInclusion")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Inclusions");

                    b.Navigation("Tour");
                });

            modelBuilder.Entity("TourPackageMicroService.Models.DailySchedule", b =>
                {
                    b.HasOne("TourPackageMicroService.Models.Itinerary", "Itinerary")
                        .WithMany("DailySchedules")
                        .HasForeignKey("ItineraryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Itinerary");
                });

            modelBuilder.Entity("TourPackageMicroService.Models.Itinerary", b =>
                {
                    b.HasOne("Destination", "Destination")
                        .WithMany()
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TourPackageMicroservice.Models.TourDetails", "Tour")
                        .WithMany("Itineraries")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Destination");

                    b.Navigation("Tour");
                });

            modelBuilder.Entity("TourPackageMicroService.Models.PickupPoint", b =>
                {
                    b.HasOne("TourPackageMicroservice.Models.TourDetails", "Tour")
                        .WithMany("PickupPoints")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tour");
                });

            modelBuilder.Entity("Destination", b =>
                {
                    b.Navigation("TourDestinations");
                });

            modelBuilder.Entity("TourPackageMicroservice.Models.Exclusions", b =>
                {
                    b.Navigation("TourExclusion");
                });

            modelBuilder.Entity("TourPackageMicroservice.Models.Inclusions", b =>
                {
                    b.Navigation("TourInclusion");
                });

            modelBuilder.Entity("TourPackageMicroService.Models.Itinerary", b =>
                {
                    b.Navigation("DailySchedules");
                });

            modelBuilder.Entity("TourPackageMicroservice.Models.TourDetails", b =>
                {
                    b.Navigation("Itineraries");

                    b.Navigation("PickupPoints");

                    b.Navigation("TourDestination");

                    b.Navigation("TourExclusion");

                    b.Navigation("TourInclusion");
                });
#pragma warning restore 612, 618
        }
    }
}
