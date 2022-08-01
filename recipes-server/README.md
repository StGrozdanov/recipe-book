## Main REST API server

The main application server is builded with Spring.

- Spring Boot
- Spring Security
- auth0 JWT Token
- Model Mapper
- Amazon AWS
- Gradle
- MySQL
- HSQLDB

## Test coverage

64% of the server files are covered, 67% service coverage, 23% controllers coverage.

![overall test](https://user-images.githubusercontent.com/74171353/181458233-68cb081c-7bde-4169-a4a1-a0e4e56633e9.jpg)
![individual test](https://user-images.githubusercontent.com/74171353/181458222-56d8c2d9-eee2-4b03-aefb-084c8ee7e52a.jpg)

## How to Install and Run the Project

In application.yaml:

1. Replace your database credentials
2. There is amazon dependancy. You have to register if u don't have account, create a bucket and input your amazon access and secret keys as well as the bucket name. Without it, you won't be able to edit/create profile and recipe pictures that you upload locally from your device. You have the option to input URL instead and all functionality will work as expected.
3. JWT secret. You need to setup your own secret key for the JWT in order to work. Create enviorement variable or just input it as a raw string.
