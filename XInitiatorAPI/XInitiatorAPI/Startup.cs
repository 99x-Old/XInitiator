using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.ApplicationInsights;
using Microsoft.Identity.Web;
using XInitiatorAPI.Data;
using XInitiatorAPI.Services;
using XInitiatorAPI.Services.Initiatives;
using XInitiatorAPI.Services.InitiativesByYear;
using XInitiatorAPI.Services.InitiativeYearService;
using XInitiatorAPI.Services.InitiativeYearServices;
using XInitiatorAPI.Services.MembershipServices;
using XInitiatorAPI.Services.UserServices;

namespace XInitiatorAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAd"));

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            services.AddHttpClient("XInitiatorAPI", c =>
            {
                c.BaseAddress = new Uri(Configuration["XInitiatorAPI"]);
                c.DefaultRequestHeaders.Add("apitoken", Configuration["XInitiatorAPIKey"]);
            });

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddSwaggerDocument();
            services.AddScoped<IInitiativeService, InitiativeService>();
            services.AddScoped<IInititiativesByYearService, InitiativesByYearService>();
            services.AddScoped<IInitiativeYearService, InitiativeYearService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IMembershipService, MembershipService>();
            services.AddApplicationInsightsTelemetry(Configuration);
            services.AddMvc(options => options.EnableEndpointRouting = false);

            services.AddHttpClient("XInitiatorAPI", c =>
            {
                c.BaseAddress = new Uri(Configuration["XInitiatorAPI"]);
                c.DefaultRequestHeaders.Add("apitoken", Configuration["XInitiatorAPIKey"]);
            });

            services.AddLogging(builder =>
            {
                builder.AddApplicationInsights(Configuration["ApplicationInsightsInstrumentationKey"]);
                builder.AddFilter<ApplicationInsightsLoggerProvider>("Microsoft", LogLevel.Error);
            });

            services.AddDbContext<BaseContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, BaseContext baseContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            baseContext.Database.Migrate();

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseOpenApi();
            app.UseSwaggerUi3();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseMvc();
        }
    }
}
