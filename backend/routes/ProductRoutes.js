import express from "express";
import {
  getVessels,
  createVessel,
  editVessel,
} from "../controllers/ProductController.js";

const router = express.Router();

router.route("/").get(getVessels).post(createVessel);
router.route("/:id").post(editVessel);

export default router;
