const axios = require("axios").default;
const cheerio = require("cheerio");

const main = async () => {
  const response = await axios.get(
    "https://www.doxygen.nl/manual/commands.html"
  );
  const html = response.data;

  const $ = await cheerio.load(html);

  const rawElems = $("li a.el");
  for (const ele of rawElems) {
    if (ele.children.length !== 0) {
      const name = ele.children[0].data;
      if (name[0] === "\\") {
        // TODO: Remove prefix.
        console.log(name);
      }
    }
  }

  // TODO: Save to a JSON file.
};

main()
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.log(err);
  });
