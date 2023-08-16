using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using UserMicroService.Interfaces;
using UserMicroService.Models;
using UserMicroService.Services;

namespace UserMicroService
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

            builder.Services.AddDbContext<UserContext>(opts =>
            {
                opts.UseSqlServer(builder.Configuration.GetConnectionString("conn"));
            });

            builder.Services.AddScoped<IGenerateToken, TokenService>();
            builder.Services.AddScoped<IBaseCRUD<string, User>, UserRepo>();
            builder.Services.AddScoped<IBaseCRUD<string, TravelAgent>, AgentRepo>();
            builder.Services.AddScoped<IBaseCRUD<string, Admin>, AdminRepo>();
            builder.Services.AddScoped<IBaseCRUD<string, Traveller>, TravellerRepo>();

            builder.Services.AddScoped<IManageUser, ManageUserService>();
            builder.Services.AddScoped<IManageAdmin, ManageAdminService>();
            builder.Services.AddScoped<IManageTravelAgent, ManageTravelAgentService>();
            builder.Services.AddScoped<IManageTraveller, ManageTravellersService>();

            builder.Services.AddScoped<IChangePassword, PasswordServices>();



            builder.Services.AddCors(opts =>
            {
                opts.AddPolicy("ReactCORS", options =>
                {
                    options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
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

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();


            app.UseAuthentication();
            app.UseCors("ReactCORS");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}