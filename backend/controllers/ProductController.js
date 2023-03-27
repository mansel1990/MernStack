import dbConn from "../config/db.js";
import util from "util";
import asyncHandler from "express-async-handler";

const getVessels = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const products = await query(`SELECT * FROM Vessels`);
    res.json(products);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const createVessel = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { name, ownerId, naccsCode } = req.body;
    const insertUser = `INSERT INTO sql12608685.Vessels 
      (name, owner_id, naccs_code)
      VALUES('${name}', '${ownerId}', '${naccsCode}');`;
    const result = await query(insertUser);

    res.status(201).json({
      id: result.insertId,
      name: name,
      ownerId,
      naccsCode,
      success: "success",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const editVessel = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { id, name, owner_id: ownerId, naccs_code: nasscCode } = req.body;

    const prodArr = await query(
      `SELECT * FROM sql12608685.Vessels where id = ${id}`
    );
    let product = {};
    if (prodArr.length > 0) {
      product = prodArr[0];
    }

    if (product) {
      const updateResult = await query(`UPDATE sql12608685.Vessels
        SET name='${name}',
        owner_id='${ownerId}',
        naccs_code='${nasscCode}'
        WHERE id=${id}`);
      res.json({
        id: product.id,
        name: name || product.name,
        ownerId: ownerId || product.owner_id,
        nasscCode: nasscCode || product.naccs_code,
      });
    } else {
      res.status(404);
      throw new Error("Vessel not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export { getVessels, createVessel, editVessel };
