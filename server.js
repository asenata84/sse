const express = require("express");
const cors = require("cors");

const app = express();
const port = 3002;
app.use(express.static("public"));
app.use(cors());

app.get("/events", function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  let i = 1;

  const interval = setInterval(() => {
    const data = `Event ${i}`;

    res.write(`id: ${i}\ndata: ${JSON.stringify(data)}\n\n`);

    console.log("%c =========== sending >>", "color:#669851;font-size:12px", i);

    i++;
  }, 2000);

  const removeInterval = () => {
    clearInterval(interval);
    res.end();
  };

  req.on("close", () => {
    removeInterval();
  });

  req.on("error", (err) => {
    console.log("%c =========== err >>", "color:#669851;font-size:12px", err);
    removeInterval();
  });
});

app.listen(port, () => console.log(`SSE app listening on port ${port}!`));
