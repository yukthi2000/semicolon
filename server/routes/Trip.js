const express = require("express");
const router = express.Router();
const { Trip } = require("../models");
const { Locations } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve trips" });
  }
});

router.get("/data", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const trips = await Trip.findAll({ where: { userId } });
    //res.json(trips);
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve trips" });
  }
});

// router.get("/dataWithLocations", async (req, res) => {
//   try {
//     const trips = await Trip.findAll({
//       include: {
//         model: Locations,
//         attributes: ["name"],
//       },
//     });
//     res.json(trips);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch trip details" });
//   }
// });

router.get("/dataWithLocations", async (req, res) => {
  try {
    const trips = await Trip.findAll({
      include: [
        {
          model: Locations,
          attributes: ["name"],
        },
      ],
    });
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trip details" });
  }
});

 //no of users display in Admin module
 router.get("/trip-count", async (req, res) => {
  try {
    const count = await Trip.count();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while counting users" });
  }
});

router.get("/dataWithLocationsForUser", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const trips = await Trip.findAll({
      where: { userId },
      include: [
        {
          model: Locations,
          attributes: ["name"],
        },
      ],
    });

    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trip details" });
  }
});

router.post("/", async (req, res) => {
  try {
    const tripData = req.body;
    const createdTrip = await Trip.create(tripData);
    res.status(201).json(createdTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a trip" });
  }
});

router.post("/tripdata", validateToken, async (req, res) => {
  try {
    const tripData = req.body;
    const userId = req.user.id;
    tripData.userId = userId;
    const createdTrip = await Trip.create(tripData);
    const createdTripId = createdTrip.id;
    console.log(createdTripId);
    res.status(201).json({ tripId: createdTripId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a trip" });
  }
});

router.delete("/trips/:id", async (req, res) => {
  const tripId = req.params.id;

  try {
    // Find the trip by ID
    const trip = await Trip.findByPk(tripId);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Delete the trip
    await trip.destroy();

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ error: "Failed to delete trip" });
  }
});

// Define the hook to check if a retrieved trip has any associated locations
Trip.afterFind(async (trips, options) => {
  if (Array.isArray(trips)) {
    // Handle multiple retrieved trips
    await Promise.all(
      trips.map(async (trip) => {
        await checkAndDeleteTrip(trip);
      })
    );
  } else {
    // Handle single retrieved trip
    await checkAndDeleteTrip(trips);
  }
});

async function checkAndDeleteTrip(trip) {
  const tripId = trip.id;

  // Check if the trip has any associated locations
  const locationCount = await Locations.count({ where: { tripId } });

  if (locationCount === 0) {
    // Delete the trip if no locations are associated
    await Trip.destroy({ where: { id: tripId } });
  }
}


module.exports = router;

// router.get("/location", async (req, res) => {
//   try {
//     const location = req.query.location; // Retrieve the location from the query string
//     const ratings = await Ratings.findAll({
//       where: { location: location },
//     });

//     res.json(ratings);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.get("/", async (req, res) => {
//   // const location = req.query.location; // Retrieve the location from the query string
//   const ratings = await Ratings.findAll();

//   res.json(ratings);
// });

// router.post("/", async (req, res) => {
//   const post = req.body;
//   await Ratings.create(post);
//   res.json(post);
// });



// const express = require("express");
// const router = express.Router();
// const { Trip } = require("../models");
// const { Locations } = require("../models");
// const { validateToken } = require("../middlewares/AuthMiddleware");

// router.get("/", async (req, res) => {
//   try {
//     const trips = await Trip.findAll();
//     res.status(200).json(trips);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to retrieve trips" });
//   }
// });

// router.get("/data", validateToken, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const trips = await Trip.findAll({ where: { userId } });
//     //res.json(trips);
//     res.status(200).json(trips);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to retrieve trips" });
//   }
// });

// // router.get("/dataWithLocations", async (req, res) => {
// //   try {
// //     const trips = await Trip.findAll({
// //       include: {
// //         model: Locations,
// //         attributes: ["name"],
// //       },
// //     });
// //     res.json(trips);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Failed to fetch trip details" });
// //   }
// // });

// router.get("/dataWithLocations", async (req, res) => {
//   try {
//     const trips = await Trip.findAll({
//       include: [
//         {
//           model: Locations,
//           attributes: ["name"],
//         },
//       ],
//     });
//     res.json(trips);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch trip details" });
//   }
// });

// router.get("/dataWithLocationsForUser", validateToken, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const trips = await Trip.findAll({
//       where: { userId },
//       include: [
//         {
//           model: Locations,
//           attributes: ["name"],
//         },
//       ],
//     });

//     res.json(trips);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch trip details" });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const tripData = req.body;
//     const createdTrip = await Trip.create(tripData);
//     res.status(201).json(createdTrip);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create a trip" });
//   }
// });

// router.post("/tripdata", validateToken, async (req, res) => {
//   try {
//     const tripData = req.body;
//     const userId = req.user.id;
//     tripData.userId = userId;
//     const createdTrip = await Trip.create(tripData);
//     const createdTripId = createdTrip.id;
//     console.log(createdTripId);
//     res.status(201).json({ tripId: createdTripId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create a trip" });
//   }
// });

// router.delete("/trips/:id", async (req, res) => {
//   const tripId = req.params.id;

//   try {
//     // Find the trip by ID
//     const trip = await Trip.findByPk(tripId);

//     if (!trip) {
//       return res.status(404).json({ error: "Trip not found" });
//     }

//     // Delete the trip
//     await trip.destroy();

//     res.status(200).json({ message: "Trip deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting trip:", error);
//     res.status(500).json({ error: "Failed to delete trip" });
//   }
// });


// module.exports = router;
