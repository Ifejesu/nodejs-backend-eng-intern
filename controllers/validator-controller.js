const payload = require("payload-validator");

// Expected payload format
const source = {
  rule: {}
};

let validatorCheck = {};

//function to check the validation
const check = (field, field_value, condition, condition_value) => {
  let validationStatus = true;

  switch (condition) {
    case "eq":
      //checks if field is equal to the condition value
      validationStatus = field_value == condition_value;
      break;
    case "neq":
      //checks if field is not equal to the condition value
      validationStatus = field_value != condition_value;
      break;
    case "gt":
      //checks if field is greater than the condition value
      validationStatus = field_value > condition_value;
      break;
    case "gte":
      //checks if field is greater than or equal to the condition value
      validationStatus = field_value >= condition_value;
      break;
    case "contains":
      //checks if field contains the condition value
      validationStatus = field_value.includes(condition_value);
      break;
    default:
      //returns error message when an unaccepted value is passed to the condition field.
      return {
        message:
          "rule.condition should be of these values: (eq, neq, gt, gte, contains).",
        status: "error",
        data: null
      };
      break;
  }

  // If the rule is successfully validated, returns a success message
  if (validationStatus)
    return {
      message: "field " + field + " successfully validated.",
      status: "success",
      data: {
        validation: {
          error: false,
          field: field,
          field_value: field_value,
          condition: condition,
          condition_value: condition_value
        }
      }
    };
  // returns error message if the rule validation fails.
  else
    return {
      message: "field " + field + " failed validation.",
      status: "error",
      data: {
        validation: {
          error: false,
          field: field,
          field_value: field_value,
          condition: condition,
          condition_value: condition_value
        }
      }
    };
};

exports.renderData = (req, res) => {
  if (!req.body || typeof req.body != "object") {
    res.status(400).json({
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null
    });
  }
  //returns error message if an invalid JSON payload is passed to the API
  else {
    //checks if the payload passed to the API is of the expected format
    const result = payload.validator(req.body, source, ["rule"], true);

    //if the payload passed to the API is of the expected format, checks other requirements
    if (result.success) {
      //assign request parameters to a variable
      const { rule, data } = req.body;

      // returns error message if the data field is not passed
      if (!data) {
        res.status(400).json({
          message: "data is required.",
          status: "error",
          data: null
        });
      }
      // if the data field is passed, checks other requirements
      else {
        //assign rule fields to a variable
        let { field, condition, condition_value } = rule;
        //returns error if field 'field' is missing from rule passed.
        if (!field) {
          res.status(400).json({
            message: "field 'field' is missing from rule.",
            status: "error",
            data: null
          });
        }
        //returns error if field 'condition' is missing from rule passed.
        else if (!condition) {
          res.status(400).json({
            message: "field 'condition' is missing from rule.",
            status: "error",
            data: null
          });
        }
        //returns error if field 'condition_value' is missing from rule passed.
        else if (!condition_value) {
          res.status(400).json({
            message: "field 'condition_value' is missing from rule.",
            status: "error",
            data: null
          });
        }
        //returns error message if the data field is of wrong type.
        else if (typeof data != "object" && typeof data != "string") {
          res.status(400).json({
            message: "data should be a JSON object, an array or a string.",
            status: "error",
            data: null
          });
        }
        //returns error if field specified in the rule object is missing from the data passed.
        else if (data[field] === undefined || data[field] === "") {
          res.status(400).json({
            message: "field " + field + " is missing from data.",
            status: "error",
            data: null
          });
        }
        // calls the check function
        else {
          validatorCheck = check(
            field,
            data[field],
            condition,
            condition_value
          );
          // returns success if the check-condition module returns success
          if (validatorCheck.status == "success")
            res.status(200).json(validatorCheck);
          // returns error if the check-condition module returns error
          else res.status(400).json(validatorCheck);
        }
      }
    }
    //returns error if the payload passed to the API is not of the expected format
    else {
      // returns error message if the rule field is not passed
      if (result.response.errorMessage.includes("required")) {
        res.status(400).json({
          message: result.response.errorKey + " is required.",
          status: "error",
          data: null
        });
      }
      //returns error message if the rule field is of wrong type
      else {
        res.status(400).json({
          message: result.response.errorKey + " should be an object.",
          status: "error",
          data: null
        });
      }
    }
  }
};
