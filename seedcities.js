const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const City = require("./city");
const csvFilePath = "cities.csv";
const mongoURI = "mongodb://127.0.0.1:27017/GeoSphere";

async function importCsvToMongo() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB via Mongoose");

    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        console.log("CSV file successfully read.");
        console.log("Raw data from CSV:", results);

        if (results.length > 0) {
          const dataset = results
            .filter((f) => {
              return !isNaN(Number(f.lon)) && !isNaN(Number(f.lat));
            })
            .map((e) => ({
              ...e,
              city: e.city,
              state_name: e.state,
              location: {
                type: "Point",
                coordinates: [Math.abs(Number(e.lon)), Number(e.lat)], // Convert longitude to positive
              },
            }));

          console.log("Transformed dataset:", dataset);

          if (dataset.length > 0) {
            await City.insertMany(dataset);
            console.log(
              `${dataset.length} documents inserted into MongoDB using Mongoose.`
            );
          } else {
            console.log("No valid data found in the CSV file after filtering.");
          }
        } else {
          console.log("No data found in the CSV file.");
        }

        mongoose.connection.close();
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

importCsvToMongo();
