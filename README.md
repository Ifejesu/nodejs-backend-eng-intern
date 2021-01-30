# NodeJS Backend Engineer (Intern) Assessment

A simple rule-validation API

## Endpoints Documentation Guide

### "/"

Method: GET

Expected Response

```
{
  "message": "My Rule-Validation API"
  "status": "success",
  "data": {
    "name": "Amos Burton",
    "github": "@amosburton",
    "email": "amosburton@rocinantecrew.com",
    "mobile": "08069920011",
    "twitter": "@amosb"
  }
}
```

### "/validate-rule"

Method: POST

Endpoint requirements/constraints:

```
a/ The rule and data fields are required.

b/ The rule field should be a valid JSON object and should contain the following required fields:
b1/ field: The field in the data passed to validate the rule against
b2/ condition: The condition to use for validating the rule. Accepted condition values are:
    i/ eq: Means the field value should be equal to the condition value
    ii/ neq: Means the field value should not be equal to the condition value
    iii/ gt: Means the field value should be greater than the condition value
    iv/ gte: Means the field value should be greater than or equal to the condition value
    v/ contains: Means the field value should contain the condition value
b3/ condition_value: The condition value to run the rule against. Your rule evaluation is expected to be like ["data.field"] ["rule.condition"] ["rule.condition_value"]

c/ The data field can be any of:
c1/ A valid JSON object
c2/ A valid array
c3/ A string

d/ If a required field isn't passed. Your endpoint should return with a response (HTTP 400 status code) that is similar to the below:

e/ If a field is of the wrong type, your endpoint should return with a response (HTTP 400 status code) that is similar to the below:

f/ If an invalid JSON payload is passed to your API, your endpoint response (HTTP 400 status code) should be:

[PS: For the error responses described above, please note that the punctuation is important. I.e the period at the end of each error message.]

g/ If the field specified in the rule object is missing from the data passed, your endpoint response (HTTP 400 status code) should be:

h/ If the rule is successfully validated, your endpoint response (HTTP 200 status code) should be:

i/ If the rule validation fails, your endpoint response (HTTP 400 status code) should be:

j/ Host your solution on Glitch / Heroku or any other platform you prefer. Be sure that the base route and API endpoint routes are accessible.
```

Expected Post Data

```
{
  "rule": {
    "field": "missions"
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}
```

Expected Response

```
{
  "message": "field missions successfully validated."
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions",
      "field_value": 45,
      "condition": "gte",
      "condition_value: 30
    }
  }
}
```

## Made by [Glitch](https://glitch.com/)

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).

( ᵔ ᴥ ᵔ )
