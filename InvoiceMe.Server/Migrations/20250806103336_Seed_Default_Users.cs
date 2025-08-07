using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InvoiceMe.Server.Migrations
{
    /// <inheritdoc />
    public partial class Seed_Default_Users : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "Avatar", "Email", "FirstName", "IsActive", "LastName", "PasswordHash", "PasswordSalt", "Phone", "RefreshToken", "RefreshTokenCreatedAt", "RefreshTokenExpiresAt", "Role", "VerificationToken" },
                values: new object[,]
                {
                    { new Guid("0ed76a7c-ca3c-45cf-a212-d54163a57f24"), "", "", "sofie@gmail.com", "Sofia", true, "Lopez", new byte[] { 165, 242, 91, 37, 15, 149, 116, 181, 17, 217, 180, 111, 227, 65, 11, 47, 177, 51, 119, 208, 92, 139, 122, 146, 31, 213, 156, 223, 192, 204, 239, 94, 87, 134, 100, 203, 38, 118, 140, 237, 151, 91, 29, 72, 189, 184, 100, 164, 106, 163, 86, 98, 20, 2, 62, 182, 53, 188, 33, 64, 230, 164, 3, 202 }, new byte[] { 141, 135, 255, 150, 182, 110, 128, 48, 205, 34, 20, 44, 61, 98, 52, 174, 235, 25, 9, 254, 142, 155, 182, 80, 131, 180, 45, 206, 62, 72, 144, 34, 252, 103, 72, 14, 205, 25, 1, 27, 253, 237, 33, 149, 145, 88, 19, 223, 235, 171, 69, 96, 148, 234, 33, 198, 94, 116, 208, 166, 67, 178, 252, 88, 62, 251, 216, 99, 112, 146, 187, 131, 1, 90, 136, 155, 192, 155, 20, 81, 41, 22, 156, 247, 225, 54, 160, 237, 111, 4, 146, 55, 148, 180, 206, 180, 88, 117, 137, 191, 238, 238, 178, 233, 242, 180, 152, 214, 194, 66, 40, 109, 125, 37, 27, 0, 77, 177, 8, 127, 17, 95, 110, 20, 213, 109, 244, 243 }, "", "", new DateTime(2025, 8, 6, 18, 33, 36, 529, DateTimeKind.Unspecified).AddTicks(8611), new DateTime(2025, 8, 13, 18, 33, 36, 529, DateTimeKind.Unspecified).AddTicks(8612), 1, "" },
                    { new Guid("a55f0dd2-a592-4e53-8179-ef1a3e26a71d"), "", "", "admin@gmail.com", "System", true, "Admin", new byte[] { 187, 54, 247, 36, 57, 44, 88, 251, 98, 201, 155, 225, 113, 179, 196, 36, 197, 137, 226, 46, 76, 118, 77, 169, 14, 156, 80, 239, 169, 71, 147, 137, 198, 105, 252, 217, 56, 18, 96, 187, 104, 239, 154, 252, 25, 215, 220, 5, 6, 193, 15, 216, 158, 56, 61, 220, 225, 243, 169, 21, 142, 64, 74, 167 }, new byte[] { 64, 102, 107, 34, 239, 46, 128, 60, 29, 65, 171, 80, 154, 94, 49, 41, 206, 176, 41, 4, 114, 60, 13, 22, 223, 248, 133, 76, 198, 173, 46, 200, 197, 166, 7, 245, 80, 186, 8, 0, 68, 185, 237, 218, 69, 55, 29, 227, 129, 173, 205, 38, 153, 163, 23, 140, 142, 65, 3, 162, 195, 94, 235, 245, 25, 41, 109, 112, 119, 100, 248, 158, 53, 174, 200, 18, 95, 230, 138, 42, 17, 92, 132, 160, 202, 107, 125, 79, 38, 111, 111, 89, 240, 111, 16, 219, 247, 171, 175, 229, 114, 221, 77, 117, 135, 20, 141, 56, 56, 66, 254, 158, 246, 222, 36, 223, 137, 207, 13, 42, 96, 4, 46, 203, 64, 92, 178, 6 }, "", "", new DateTime(2025, 8, 6, 18, 33, 36, 529, DateTimeKind.Unspecified).AddTicks(8575), new DateTime(2025, 8, 13, 18, 33, 36, 529, DateTimeKind.Unspecified).AddTicks(8604), 0, "" },
                    { new Guid("af5fe090-404f-4b9e-a8da-dfd3a34cb2c1"), "", "", "mark@gmail.com", "Mark", true, "Rivera", new byte[] { 124, 244, 138, 53, 64, 33, 87, 118, 172, 240, 70, 109, 207, 70, 235, 43, 121, 250, 241, 119, 32, 66, 40, 226, 43, 226, 94, 69, 160, 207, 26, 120, 93, 114, 69, 87, 193, 31, 32, 91, 92, 173, 142, 208, 208, 99, 155, 133, 229, 249, 172, 141, 67, 72, 21, 102, 164, 189, 22, 174, 75, 230, 34, 180 }, new byte[] { 232, 124, 255, 172, 192, 58, 79, 60, 14, 209, 235, 235, 19, 161, 165, 164, 148, 38, 65, 244, 144, 85, 45, 38, 173, 185, 100, 30, 29, 192, 232, 106, 241, 128, 129, 141, 219, 119, 51, 4, 55, 159, 190, 227, 68, 160, 114, 248, 35, 80, 145, 39, 83, 44, 148, 181, 142, 181, 117, 61, 175, 209, 78, 54, 215, 17, 32, 60, 33, 163, 118, 86, 37, 192, 244, 65, 235, 244, 206, 13, 51, 117, 117, 138, 104, 153, 222, 117, 48, 151, 127, 45, 244, 155, 50, 65, 194, 152, 136, 78, 91, 46, 37, 67, 243, 83, 170, 221, 200, 194, 121, 172, 84, 89, 128, 115, 200, 248, 27, 85, 82, 198, 193, 218, 59, 169, 207, 78 }, "", "", new DateTime(2025, 8, 6, 18, 33, 36, 529, DateTimeKind.Unspecified).AddTicks(8609), new DateTime(2025, 8, 13, 18, 33, 36, 529, DateTimeKind.Unspecified).AddTicks(8610), 1, "" },
                    { new Guid("f6a84f3d-413c-49d8-8fb8-9319cdfde5a6"), "", "", "anna@gmail.com", "Anna", true, "Cruz", new byte[] { 226, 156, 196, 169, 159, 88, 210, 7, 129, 146, 149, 241, 106, 209, 140, 137, 181, 171, 80, 5, 146, 59, 167, 211, 18, 202, 104, 108, 82, 116, 208, 66, 144, 151, 81, 89, 127, 187, 31, 17, 151, 85, 148, 56, 84, 242, 122, 47, 224, 195, 206, 179, 203, 223, 118, 220, 221, 161, 97, 159, 36, 17, 78, 242 }, new byte[] { 62, 137, 209, 209, 106, 210, 196, 26, 149, 136, 111, 22, 182, 23, 56, 255, 212, 220, 179, 188, 122, 28, 151, 158, 125, 53, 54, 27, 32, 83, 170, 139, 8, 131, 244, 67, 93, 62, 95, 73, 198, 138, 214, 111, 190, 41, 25, 48, 3, 36, 229, 225, 58, 178, 141, 91, 22, 95, 24, 91, 143, 238, 176, 203, 126, 199, 199, 21, 208, 240, 239, 89, 246, 78, 213, 172, 130, 0, 219, 185, 121, 211, 45, 85, 225, 129, 208, 243, 224, 184, 148, 50, 116, 87, 249, 51, 15, 38, 251, 10, 192, 23, 185, 70, 185, 7, 9, 25, 118, 181, 39, 52, 145, 208, 17, 89, 59, 176, 237, 68, 163, 83, 221, 192, 29, 77, 137, 49 }, "", "", new DateTime(2025, 8, 6, 18, 33, 36, 529, DateTimeKind.Unspecified).AddTicks(8607), new DateTime(2025, 8, 13, 18, 33, 36, 529, DateTimeKind.Unspecified).AddTicks(8608), 1, "" }
                });

            migrationBuilder.InsertData(
                table: "Clients",
                columns: new[] { "Id", "UserId" },
                values: new object[,]
                {
                    { 1, new Guid("f6a84f3d-413c-49d8-8fb8-9319cdfde5a6") },
                    { 2, new Guid("af5fe090-404f-4b9e-a8da-dfd3a34cb2c1") },
                    { 3, new Guid("0ed76a7c-ca3c-45cf-a212-d54163a57f24") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Clients",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Clients",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Clients",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("a55f0dd2-a592-4e53-8179-ef1a3e26a71d"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("0ed76a7c-ca3c-45cf-a212-d54163a57f24"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("af5fe090-404f-4b9e-a8da-dfd3a34cb2c1"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("f6a84f3d-413c-49d8-8fb8-9319cdfde5a6"));
        }
    }
}
