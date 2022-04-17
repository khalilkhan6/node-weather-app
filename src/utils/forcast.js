const request = require("postman-request");

const forcast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=126cbaf8217136c896babc8f392f35b0&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    console.log(body.current);
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.temperature +
          " degrees but feels like " +
          body.current.feelslike +
          ". There is a " +
          body.current.precip +
          "% chance of rain.Visibility is " +
          body.current.visibility +
          "km"
      );
    }
  });
};

module.exports = forcast;
