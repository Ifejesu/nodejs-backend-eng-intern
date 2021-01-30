exports.renderData = (req, res) => {
  res.status(200).json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Ifejesu Goodness Olajide",
      github: "@ifejesu",
      email: "ifejesugoodness97@gmail.com",
      mobile: "08179386053",
      twitter: "@iamifejesu"
    }
  });
};
