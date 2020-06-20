const express=require("express");
const exphbs=require("express-handlebars");
const fs=require("fs");
const app=express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.listen(process.env.PORT || 3000);
app.get("/", (req, res) => generateHomepage(req, res));


async function generateHomepage(req, res) {
  const data=await fs.readFileSync("./newsitems.json", "utf8");
  if (!data) {
    throw new Error("No data has been found");
  }
  res.render("home", { data: JSON.parse(data) });
}