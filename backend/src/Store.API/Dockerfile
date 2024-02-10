FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Store.API/Store.API.csproj", "src/Store.API/"]
COPY ["src/Store.Infra.Data/Store.Infra.Data.csproj", "src/Store.Infra.Data/"]
COPY ["src/Store.Domain/Store.Domain.csproj", "src/Store.Domain/"]
COPY ["src/Store.Application/Store.Application.csproj", "src/Store.Application/"]
RUN dotnet restore "./src/Store.API/./Store.API.csproj"
COPY . .
WORKDIR "/src/src/Store.API"
RUN dotnet build "./Store.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Store.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Store.API.dll"]