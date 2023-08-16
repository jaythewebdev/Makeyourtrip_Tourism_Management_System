using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TourPackageMicroService.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Destinations",
                columns: table => new
                {
                    DestinationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DestinationCityName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Destinations", x => x.DestinationId);
                });

            migrationBuilder.CreateTable(
                name: "Exclusions",
                columns: table => new
                {
                    ExclusionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExclusionDescription = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exclusions", x => x.ExclusionId);
                });

            migrationBuilder.CreateTable(
                name: "Inclusions",
                columns: table => new
                {
                    InclusionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InclusionDescription = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inclusions", x => x.InclusionId);
                });

            migrationBuilder.CreateTable(
                name: "TourDetails",
                columns: table => new
                {
                    TourId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TravelAgentId = table.Column<int>(type: "int", nullable: false),
                    TourName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TourDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tourtype = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DepartureDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TourPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaxCapacity = table.Column<int>(type: "int", nullable: false),
                    BookedCapacity = table.Column<int>(type: "int", nullable: false),
                    Availability = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccomodationStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CancellationPolicy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BookingRestriction = table.Column<int>(type: "int", nullable: false),
                    HealthAndSafety = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourDetails", x => x.TourId);
                });

            migrationBuilder.CreateTable(
                name: "Itineraries",
                columns: table => new
                {
                    ItineraryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    DayNumber = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DestinationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Itineraries", x => x.ItineraryId);
                    table.ForeignKey(
                        name: "FK_Itineraries_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "DestinationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Itineraries_TourDetails_TourId",
                        column: x => x.TourId,
                        principalTable: "TourDetails",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PickupPoints",
                columns: table => new
                {
                    PickupPointId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PickupTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PickupPoints", x => x.PickupPointId);
                    table.ForeignKey(
                        name: "FK_PickupPoints_TourDetails_TourId",
                        column: x => x.TourId,
                        principalTable: "TourDetails",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TourDestinations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    DestinationId = table.Column<int>(type: "int", nullable: false),
                    Destinationimage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DestinationActivity = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourDestinations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TourDestinations_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "DestinationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TourDestinations_TourDetails_TourId",
                        column: x => x.TourId,
                        principalTable: "TourDetails",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TourExclusions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    ExclusionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourExclusions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TourExclusions_Exclusions_ExclusionId",
                        column: x => x.ExclusionId,
                        principalTable: "Exclusions",
                        principalColumn: "ExclusionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TourExclusions_TourDetails_TourId",
                        column: x => x.TourId,
                        principalTable: "TourDetails",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TourInclusions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    InclusionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourInclusions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TourInclusions_Inclusions_InclusionId",
                        column: x => x.InclusionId,
                        principalTable: "Inclusions",
                        principalColumn: "InclusionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TourInclusions_TourDetails_TourId",
                        column: x => x.TourId,
                        principalTable: "TourDetails",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DailySchedules",
                columns: table => new
                {
                    ScheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItineraryId = table.Column<int>(type: "int", nullable: false),
                    Timing = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Activity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Place = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailySchedules", x => x.ScheduleId);
                    table.ForeignKey(
                        name: "FK_DailySchedules_Itineraries_ItineraryId",
                        column: x => x.ItineraryId,
                        principalTable: "Itineraries",
                        principalColumn: "ItineraryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DailySchedules_ItineraryId",
                table: "DailySchedules",
                column: "ItineraryId");

            migrationBuilder.CreateIndex(
                name: "IX_Destinations_DestinationCityName",
                table: "Destinations",
                column: "DestinationCityName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Exclusions_ExclusionDescription",
                table: "Exclusions",
                column: "ExclusionDescription",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inclusions_InclusionDescription",
                table: "Inclusions",
                column: "InclusionDescription",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Itineraries_DestinationId",
                table: "Itineraries",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Itineraries_TourId",
                table: "Itineraries",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_PickupPoints_TourId",
                table: "PickupPoints",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_TourDestinations_DestinationId",
                table: "TourDestinations",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_TourDestinations_TourId",
                table: "TourDestinations",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_TourExclusions_ExclusionId",
                table: "TourExclusions",
                column: "ExclusionId");

            migrationBuilder.CreateIndex(
                name: "IX_TourExclusions_TourId",
                table: "TourExclusions",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_TourInclusions_InclusionId",
                table: "TourInclusions",
                column: "InclusionId");

            migrationBuilder.CreateIndex(
                name: "IX_TourInclusions_TourId",
                table: "TourInclusions",
                column: "TourId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailySchedules");

            migrationBuilder.DropTable(
                name: "PickupPoints");

            migrationBuilder.DropTable(
                name: "TourDestinations");

            migrationBuilder.DropTable(
                name: "TourExclusions");

            migrationBuilder.DropTable(
                name: "TourInclusions");

            migrationBuilder.DropTable(
                name: "Itineraries");

            migrationBuilder.DropTable(
                name: "Exclusions");

            migrationBuilder.DropTable(
                name: "Inclusions");

            migrationBuilder.DropTable(
                name: "Destinations");

            migrationBuilder.DropTable(
                name: "TourDetails");
        }
    }
}
