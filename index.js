const mongoose = require("mongoose");
const City = require("./city");

const mongoURI = "mongodb://127.0.0.1:27017/GeoSphere";

async function main() {
  try {
    console.clear();
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB via Mongoose");
    const maxDistanceInMeters = 50 * 1000;

    const [queryLatitude, queryLongitude] = [39.9566, 75.1899];

    console.time();

    const result = await City.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [queryLongitude, queryLatitude],
          },
          distanceField: "distance",
          maxDistance: maxDistanceInMeters,
          spherical: true,
        },
      },
    ]);

    console.log(
      `=====> You have ${result.length} cities within ${
        maxDistanceInMeters / 1000
      } KM.`
    );
    console.log(
      result.map(
        (e) =>
          `City: ${e.city}, State Name: ${
            e.state_name
          }, Distance: (${Math.round(e.distance / 1000)} KM away)`
      )
    );
    console.timeEnd();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
}

main();
