const fs = require("fs");
module.exports = async (client) => {
  const event_files = fs
    .readdirSync("./events/")
    .filter((file) => file.endsWith(".js"));
  for (const file of event_files) {
    try {
      let eventName = file.split(".")[0];
      require(`../events/${file}`);
    } catch (e) {
      console.log(e);
    }
  }
};
