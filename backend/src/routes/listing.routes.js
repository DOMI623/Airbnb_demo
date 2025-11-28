import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.get("/get", getAllListings);
listingRouter.get("/getId/:id", getListingById);
listingRouter.post("/create", createListing);
listingRouter.put("/update/:id", updateListing);
listingRouter.delete("/delete/:id", deleteListing);

export default listingRouter;
