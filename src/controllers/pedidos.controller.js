import Pedido from "../models/Pedido";
import session from "express-session";

export async function conseguir() {
  return await Pedido.find().lean();
}

export async function conseguirEsp(id) {
  return await Pedido.find({ cliente: id }).lean();
}

export async function conseguirId(id) {
  return await Pedido.find({ _id: id });
}

export async function pedidoGuardar(req, res) {
  const pedido = Pedido(req.body);
  console.log(pedido);
  pedido.cliente = res.locals.idS;
  pedido.estatus = "En Proceso";
  pedido.total = req.body.total;
  const guardado = await pedido.save();
  res.redirect("/usuario/" + res.locals.idS)
}

export async function clienteVerificar(req, res) {
  const us = req.body.usNombre;
  const ps = req.body.usPass;
  let id;
  const clientes = await fetch("http://127.0.0.1:8080/clientes/")
    .then((response) => response.text())
    .then((response) => {
      return response;
    });
  try {
    let Jclientes = JSON.parse(clientes);
    let val = false;
    Jclientes["data"].forEach((element) => {
      if (element.usuario == us)
        if (element.contrasena == ps) {
          val = true;
          id = element.idCl;
        }
    });
    if (val) {
      req.session.user = us;
      req.session.nivel = 0;
      req.session.idS = id;
      res.redirect("/usuario/" + id)
    } else {
      res.redirect("/err");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function usuarioVerificar(req, res) {
  const us = req.body.adNombre;
  const ps = req.body.adPass;
  let id;
  const usuarios = await fetch("http://127.0.0.1:8080/usuarios/")
    .then((response) => response.text())
    .then((response) => {
      return response;
    });
  try {
    let Jusuarios = JSON.parse(usuarios);
    let val = false;
    Jusuarios["data"].forEach((element) => {
      if (element.usuario == us)
        if (element.contrasena == ps) {
          val = true;
          id = element.idUs;
        }
    });
    if (val) {
      req.session.user = us;
      req.session.nivel = 1;
      req.session.idS = id;
      res.redirect("/pedidos");
    } else {
      res.redirect("/err");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function remplazar(ped, cli) {
  cli.data.forEach((cliente) => {
    ped.forEach((pedido) => {
      if (pedido.cliente == cliente.idCl) {
        pedido.cliente = cliente.usuario;
        pedido.direccion = cliente.direccion;
      }
    });
  });
  return ped;
}
