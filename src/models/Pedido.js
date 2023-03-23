import { Schema, model } from "mongoose";

const PedidoSquema = Schema(
  {
    cliente: Number,
    servicios: Array,
    direccion: String,
    total: Number,
    estatus: String,
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default model("Pedido", PedidoSquema);

