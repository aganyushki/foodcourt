
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

#### Docker environment

required: docker on the host machine

```powershell
    PS> .\gradlew :startDockerDevelopmentEnvironment
    PS> .\gradlew :stopDockerDevelopmentEnvironment
```
```
    idea run configuration: "start development environment"
```
   
will be started:
- MySQL container with empty database
    - initialize database with Flyway then DB will be ready
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
    
#### Local environment

1) Prepare database. Use Local instance or container from docker
    ```
    Database schema and data initialization are described below
    ```
1) start spring application
    ```powershell
    PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="your_password"; PS> .\gradlew :dark:bootRun
    ```
    or
    ```
    idea run configuration: "run local (bootRun)"
    ```
    db access can be configured in run-configuration environment variables
    
1) start web ui with proxy to local spring application
    
    prepare
    ```powershell
    PS> cd white
    PS> npm install
    ```
    start
    ```powershell
    PS> npm start
    ```
    or 
    ```
    idea run configuration: "start web ui with proxy to dark side"
    ```

#### Database schema initialization 

To manage database schema we are using Flyway.

```powershell
PS> .\gradlew :storage:flywayMigrate
```

```powershell
PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="your_password"; PS> .\gradlew :storage:flywayMigrate
```

#### Fake database data

Working with MySQL database in docker development environment

1) **build test database** (required: empty database)
    ```powershell
    PS> .\gradlew :storage:buildFakeDatabase
    ```
    ```
    idea run configuration: "build fake database for docker"
    ```
1) touch Flayway to get info
    ```powershell
    PS> .\gradlew :storage:flywayInfo
    ```
1) touch Flayway to clean database
    ```powershell
    PS> .\gradlew :storage:flywayClean
    ```
    ```
    idea run configuration: "clean database for docker"
    ```

Working with local installed MySQL database

1) **build test database** (required: empty database)
    ```powershell
    PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="your_password"; .\gradlew :storage:buildFakeDatabase
    ```
    ```
    idea run configuration: "build fake database for local"
    ```
1) touch Flayway to get info
    ```powershell
    PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="your_password"; .\gradlew :storage:flywayInfo
    ```
    ```
    idea run configuration: "info database for local"
    ```
1) touch Flayway to clean database
    ```powershell
    PS> $Env:MYSQL_HOST_PORT="localhost:3306";$Env:MYSQL_DB="food_court";$Env:MYSQL_USER="user_name";$Env:MYSQL_PASSWORD="your_password"; .\gradlew :storage:flywayClean
    ```
    ```
    idea run configuration: "clean database for local"
    ```

## Usefull links

- https://reactjs.org/docs/getting-started.html
- https://reactjs.org/docs/state-and-lifecycle.html
- https://reactjs.org/docs/refs-and-the-dom.html
- https://reacttraining.com/react-router/web/api
- https://github.com/mobxjs/mobx-react
- https://github.com/mobxjs/mobx
- https://mobx.js.org/index.html
- https://mobx.js.org/getting-started.html
- https://material-ui.com/getting-started/installation/
- https://material.io/tools/icons/?style=baseline
- https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html
- https://www.baeldung.com/spring-security-multiple-auth-providers
- https://dev.mysql.com/doc/refman/8.0/en/create-user.html
- https://github.com/avast/gradle-docker-compose-plugin

## Important notes

##### MobX

> People often use MobX as alternative for Redux. But please note that MobX is just a library to solve a technical problem and not an architecture or even state container in itself.

https://mobx.js.org/getting-started.html
