const exress = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

const app = exress();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.use(exress.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forcast(latitude, longitude, (error, forcastdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forcast: forcastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    description: "Page not found",
  });
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
