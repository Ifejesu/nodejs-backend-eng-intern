var express = require("express");
var router = express.Router();

const baseController = require("./controllers/base-controller");
const validatorController = require("./controllers/validator-controller");

// define the home page route
router.get("/", baseController.renderData);

// define the validate-rule route
router.post("/validate-rule", validatorController.renderData);

module.exports = router;
