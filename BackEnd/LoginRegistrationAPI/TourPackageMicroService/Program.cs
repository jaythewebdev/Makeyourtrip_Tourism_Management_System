using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using TourPackageMicroservice.Interfaces;
using TourPackageMicroservice.Models;
using TourPackageMicroservice.Models.Context;
using TourPackageMicroService.Interfaces;
using TourPackageMicroService.Services;

namespace TourPackageMicroService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<TourContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("conn")));

            builder.Services.AddScoped<IManageDestination, DestinationsService>();
            builder.Services.AddScoped<IManageInclusion, InclusionService>();
            builder.Services.AddScoped<IManageExclusion, ExclusionService>();
            builder.Services.AddScoped<IManageTourDetails, TourDetailsService>();



            builder.Services.AddScoped<IRepo<Destination,int>,DestinationRepo>();
            builder.Services.AddScoped<IRepo<Exclusions,int>, ExclusionsRepo>();
            builder.Services.AddScoped<IRepo<Inclusions,int>, InclusionsRepo>();
            builder.Services.AddScoped<IRepo<TourDetails, int>,TourDetailsRepo>();

            builder.Services.AddSwaggerGen(c => {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme."
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                     {
                         {
                            new OpenApiSecurityScheme
                                {
                                    Reference = new OpenApiReference
                                    {
                                        Type = ReferenceType.SecurityScheme,
                                        Id = "Bearer"
                                    }
                                },
                            new string[] {}
                         }
                 });
            });
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactCORS",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthentication();
            app.UseCors("ReactCORS");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}