const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "cbbc91ed597b45bcb1f5540dc64e7bc2",
});

const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleGenderAPICall = (req, res) => {
  app.models
    .predict("af40a692dfe6040f23ca656f4e144fc2", req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json(err));
};

const handleAgeAPICall = (req, res) => {
    app.models
      .predict("36f90889189ad96c516d134bc713004d", req.body.input)
      .then((data) => res.json(data))
      .catch((err) => res.status(404).json(err));
  };

const handleEthnicityAPICall = (req, res) => {
    app.models
      .predict("93c277ec3940fba661491fda4d3ccfa0", req.body.input)
      .then((data) => res.json(data))
      .catch((err) => res.status(404).json(err));
  };

const handleImage = (req, res, db) => {
  const { id } = req.body;
  

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(404).json("unable to get entries"));
};



module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall,
  handleGenderAPICall: handleGenderAPICall,
  handleAgeAPICall: handleAgeAPICall,
  handleEthnicityAPICall: handleEthnicityAPICall
};
