
## Quick start

Start dev environment locally with local db connection
```powershell
    PS> .\gradlew.bat :white:npmInstall
    PS> .\gradlew.bat :white:npm_run-script_start
    PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="password"; .\gradlew.bat :dark:bootRun
```

see "__Local environment__" section for more information.

## Build and installation

Build
```powershell
    PS> .\gradlew.bat :buildArtifact 
    PS> ls .\dark\build\libs\dark.jar
```

Run
```powershell
    PS> java -DMYSQL_DB=food_court -DMYSQL_HOST_PORT=localhost:3306 -DMYSQL_PASSWORD=password -DMYSQL_USER=user_name -jar .\dark\build\libs\dark.jar
```

## Updates installed application

// todo

## Development environment

###### environment variable which are used to manage access to database 
```powershell
MYSQL_HOST_PORT="localhost:3306" 
MYSQL_DB="food_court"
MYSQL_USER="user_name"
MYSQL_PASSWORD="your_password"
```
###### environment variable which are used to manage test DB builder 
```powershell
MAX_CUSTOMER_PER_GROUP=30
MAX_CAKES=100
MAX_CAKE_PRICE=200
MAX_INCOMING_TX_PER_CUSTOMER=24
MAX_INCOMING_TX_AMOUNT=2000
MAX_ORDER_TX_PER_CUSTOMER=1000
MAX_ORDER_TX_AMOUNT=5
```
> used in "build fake database for local" and "build fake database for docker" idea run configurations
    
#### Local environment

1) Prepare database. Use Local instance or container from docker
    ```
    Database schema and data initialization are described below
    ```
1) start spring application
    ```powershell
    PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="your_password"; .\gradlew.bat :dark:bootRun
    ```
    or
    ```
    idea run configuration: "run local (bootRun)"
    ```
    
1) start web ui with proxy to local spring application
    
    prepare
    ```powershell
    PS> .\gradlew.bat :white:npmInstall
    ```
    start
    ```powershell
    PS> .\gradlew.bat :white:npm_run-script_start
    ```
    or 
    ```
    idea run configuration: "start web ui with proxy to dark side"
    ```

#### Docker environment

```powershell
    PS> .\gradlew.bat :startDockerDevelopmentEnvironment
    PS> .\gradlew.bat :stopDockerDevelopmentEnvironment
```
```
    idea run configuration: "start development environment"
```
   
will be started:
- MySQL container with default users appuser1/secretpwd1
    - initialize database with Flyway then DB container will be ready
    - initialize fake database
    - root password: root
- Application node
    - node with deployed spring boot application and web ui
    
```yaml
# docker-compose.yml
# ...
  appnode:
    container_name: food_court_appnode
    restart: always
    ports:
      - "80:80"
    # ...
  mysql:
    container_name: food_court_storage
    restart: always
    ports:
      - "3307:3306"
    # ...
```

#### Database schema initialization 

To manage database schema we are using Flyway.

```powershell
PS> .\gradlew.bat :storage:flywayMigrate
```

```powershell
PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="your_password"; .\gradlew.bat :storage:flywayMigrate
```

#### Database migration
> from first implementation to new, java version

```powershell
PS> .\gradlew.bat :storage:migrateDatabase
```
environment variables
```bash
MYSQL_DB=
MYSQL_HOST_PORT=
MYSQL_PASSWORD=
MYSQL_USER=
OLD_MYSQL_DB=
OLD_MYSQL_HOST_PORT=
OLD_MYSQL_PASSWORD=
OLD_MYSQL_USER=
```

also we have idea run configuration for that: ```migrate database for local target```

#### Fake database data

Working with MySQL database in docker development environment

1) **build test database**
    ```powershell
    PS> .\gradlew.bat :storage:buildFakeDatabase
    ```
    ```
    idea run configuration: "build fake database for docker"
    ```
1) touch Flayway to get info
    ```powershell
    PS> .\gradlew.bat :storage:flywayInfo
    ```
1) touch Flayway to clean database
    ```powershell
    PS> .\gradlew.bat :storage:flywayClean
    ```
    ```
    idea run configuration: "clean database for docker"
    ```

Working with local installed MySQL database

1) **build test database**
    ```powershell
    PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="your_password"; .\gradlew.bat :storage:buildFakeDatabase
    ```
    ```
    idea run configuration: "build fake database for local"
    ```
1) touch Flayway to get info
    ```powershell
    PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="your_password"; .\gradlew.bat :storage:flywayInfo
    ```
    ```
    idea run configuration: "info database for local"
    ```
1) touch Flayway to clean database
    ```powershell
    PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="your_password"; .\gradlew.bat :storage:flywayClean
    ```
    ```
    idea run configuration: "clean database for local"
    ```
