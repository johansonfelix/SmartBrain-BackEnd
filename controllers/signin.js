const handleSignIn = (bcrypt, db) => (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
      return res.status(404).json('incorrect form submission')
  }
  
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", data[0].email)
          .then((data) => {
            res.json(data[0]);
          })
          .catch((err) => {
            res.status(404).json("unable to get user");
          });
      } else res.status(404).json("wrong credentials");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json("wrong credentials");
    });
};

module.exports = {
  handleSignIn: handleSignIn,
};
