const express = require("express");

const app = require("../app");
const db = require("../db");

const router = new express.Router();



router.get("/companies", async function (req, res, next) {
  const results = await db.query(
   `SELECT code, name, description
    FROM companies`);
  const companies = results.rows;
    return res.json({ companies });
});


router.get("/companies/:code", async function (req, res, next) {
  try {
    const results = await db.query(
      `SELECT code, name, description
      FROM companies`);
    const companies = results.rows; //????
      return res.json({ company: {code, name, description} });
  } catch(e) {
      e = res.status(404)
        .json({ code: "Company not found!" });
        return next(e);
    }
}); 

router.post("/companies", async function (req, res, next) {
  try {
    const { code, name, description} = req.body;

    const result = await db.query(
      `INSERT INTO companies (code, name, description)
      VALUES ($1, $2, $3)
      RETURNING code, name, description`,
      [code, name, description]
    );
    const company = result.rows[0];
    return res.status(201).json({ company: {code, name, description}});
  } catch (err) {
    return next(err);
  }
});

router.put("/companies/:code", async function (req, res, next) {
  try {
    const code = req.params.code;

    const result = await db.query(
      `UPDATE companies
      SET name= $1
      SET description= $2
      WHERE code= $3
      RETURNING name, description`,
      [name, description, code]

    )
  }
})

    module.exports = router;