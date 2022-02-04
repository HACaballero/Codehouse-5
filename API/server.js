const express = require("express");
const handlebars = require("express-handlebars");
var bodyParser = require("body-parser");
const { router, producto } = require("./routes.js");
const { engine } = require("express-handlebars");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.engine(
	"handlebars",
	engine({
		layoutsDir: __dirname + "/views/layouts",
	})
);

app.set("view engine", "handlebars");

app.use("/api/productos", router);

app.get("/", (req, res) => {
	res.render("main", { layout: "index" });
});
app.get("/productos", async (req, res) => {
	productos = await producto.getAll().then((productos) => {
		return productos;
	});
	productos = JSON.parse(JSON.stringify(productos));
	res.render("productos", {
		layout: "index",
		list: productos,
	});
});

app
	.listen(8080, () => console.log("Server iniciado en el puerto 8080"))
	.on("error", function (err) {
		console.log("Error al querer conectarse al puerto 8080");
	});
