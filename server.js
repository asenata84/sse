const express = require("express");
const cors = require("cors");

const app = express();

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
    res.write(`data: Event ${i}\n\n`);
    i++;

    console.log("%c =========== sending >>", "color:#669851;font-size:12px", i);
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

app.listen(3000, () => console.log("SSE app listening on port 3000!"));
