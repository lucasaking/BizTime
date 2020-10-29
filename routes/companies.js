const express = require("express");

const app = require("../app");
const db = require("./biztime");

const router = new express.Router();



router.get("/companies", async function (req, res, next) {
  const results = await db.query(
    `SELECT code, name, description
         FROM companies`);
  const companies = results.rows;
  return res.json({ companies });
});


  router.get("/companies/:code", function (req, res, next) {
    try {
    const results = db.query(
      `SELECT code, name, description
         FROM companies`);
    const company = results.rows;
    return res.json({ company: {code, name, description} });
    } catch(e) {
      e = res.status(404)
        .json({ code: "Company not found!" });
        return next(e);
    }
    }); 

    module.exports = router;