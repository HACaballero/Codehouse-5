const express = require("express");
var bodyParser = require("body-parser");
const { router, producto } = require("./routes.js");
let pug = require("pug");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

// Se indica el directorio donde se almacenarán las plantillas
app.set("views", "./views");

// Se indica el motor del plantillas a utilizar
app.set("view engine", "pug");

app.use("/api/productos", router);

app.get("/", (req, res) => {
	res.render("form.pug");
});
app.get("/productos", async (req, res) => {
	productos = await producto.getAll().then((productos) => {
		return productos;
	});
	productos = JSON.parse(JSON.stringify(productos));
	res.render("productos.pug", {
		layout: "index",
		list: productos,
	});
});

app
	.listen(8080, () => console.log("Server iniciado en el puerto 8080"))
	.on("error", function (err) {
		console.log("Error al querer conectarse al puerto 8080");
	});
