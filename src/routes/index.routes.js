import { response, Router } from "express";
import session from "express-session";
import Pedido from "../models/Pedido";
import {
  clienteVerificar,
  pedidoGuardar,
  conseguir,
  remplazar,
  conseguirEsp,
  usuarioVerificar,
  conseguirId,
} from "../controllers/pedidos.controller";
const router = Router();

router.get("/", (req, res) => {
  if (res.session) {
    req.session.destroy();
  }
  console.log(res.locals);
  res.render("index", { layout: "login" });
});

router.get("/logout", (req, res) => {
  if (res.session) {
    req.session.destroy();
  }
  console.log(res.locals);
  res.redirect("/");
});

router.get("/prueba", async (req, res) => {
  console.log(res.locals);
  res.send("Exito");
});

router.post("/clientes/verificar", clienteVerificar);
router.post("/usuario/verificar", usuarioVerificar);

router.get("/usuario/:id", async (req, res) => {
  const pedido = await conseguirEsp(req.params.id);
  const clientes = await fetch("http://127.0.0.1:8080/clientes")
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
  const pedidos = await remplazar(pedido, clientes);
  res.render("menuUsuarios", { pedidos });
});

router.get("/pedidos", async (req, res) => {
  console.log(res.locals);
  if (req.session.nivel != 0) {
    const pedido = await conseguir();
    const clientes = await fetch("http://127.0.0.1:8080/clientes")
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
    const pedidos = await remplazar(pedido, clientes);
    res.render("verPedidos", { pedidos });
  } else {
    res.render("index");
  }
});

router.get("/pedidos/agregar", (req, res) => {
  res.render("agregarPedido");
});

router.post("/pedidos/add", pedidoGuardar);

router.get("/pedido/:id/completar", async (req, res) => {
  const pedido = await Pedido.findById(req.params.id);
  pedido.estatus = "Completado";
  await pedido.save();
  res.redirect("/pedidos");
});

router.get("/pedido/:id/cancelar", async (req, res) => {
  const pedido = await Pedido.findById(req.params.id);
  pedido.estatus = "Cancelado";
  await pedido.save();
  if (res.locals.nivel == 1) res.redirect("/pedidos");
  else res.redirect("/usuario/" + res.locals.idS);
});

router.get("/usuarios/registrar", (req, res) => {
  res.render("registro", { layout: "login" });
});

router.post("/usuarios/registrado", async (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  var raw =
    '{\r\n    "usuario": "' +
    req.body.usuario +
    '",\r\n    "contrasena": "' +
    req.body.contrasena +
    '",\r\n    "telefono": "' +
    req.body.telefono +
    '",\r\n    "correo": "' +
    req.body.correo +
    '",\r\n    "direccion": "' +
    req.body.direccion +
    '"\r\n}';

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://127.0.0.1:8080/clientes/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  res.redirect("/");
});

router.get("/err", (req, res) => {
  res.render("err", { layout: "login" });
});
export default router;
