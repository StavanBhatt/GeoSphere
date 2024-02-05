## Geo Sphere

GeoSphere is a Javascript application designed to use your current coordinates to discover cities that are nearby. [Latitude and Longitude]

## Installation

1. Clone this repository with the following command

```
git clone https://github.com/StavanBhatt/GeoSphere.git
```

2. Install all the dependencies with the following command

```
npm i
```

3. Make a new MongoDB database with the name you want, then modify the name in the code.

4. You can run node index.js to launch the application and retrieve the locations that are closest to you. additionally, if your database is empty, start by using node seedcities.js to seed the data.

5. The following command to seed the database

```
node seedcities.js
```

6. The following command to execute the application

```
node index.js
```
