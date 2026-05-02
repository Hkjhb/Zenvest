require("dotenv").config();

const mongoose = require("mongoose");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const { generateAuthToken, hashPassword } = require("./utils/auth");
const { defaultHoldings, defaultPositions } = require("./utils/portfolio");

const seedUsername = "demo";
const seedPassword = "demo123";

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("Connected to DB, seeding demo auth portfolio...");

    await HoldingsModel.deleteMany({});
    await PositionsModel.deleteMany({});
    await OrdersModel.deleteMany({});
    await UserModel.deleteMany({});

    const { salt, passwordHash } = hashPassword(seedPassword);
    const user = await UserModel.create({
      username: seedUsername,
      salt,
      passwordHash,
      authToken: generateAuthToken(),
      openingBalance: 50000,
      cashBalance: 50000,
    });

    await HoldingsModel.insertMany(
      defaultHoldings.map((item) => ({
        userId: user._id,
        ...item,
      }))
    );

    await PositionsModel.insertMany(
      defaultPositions.map((item) => ({
        userId: user._id,
        ...item,
      }))
    );

    console.log("Seeded demo user.");
    console.log(`Username: ${seedUsername}`);
    console.log(`Password: ${seedPassword}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
