import Pedido from "../models/Pedido";

async function test(){
    const a = await Pedido.find().lean();
    table(response);
}

function table(data){
    let main = document.getElementById("main");
    let tb = document.createElement("table");
    tb.className = "table";
    let tr = document.createElement("tr");
    let tam = Object.keys(data[0]);
    tam.forEach(element => {
        let th = document.createElement("th");
        th.innerText = element;
        tr.append(th);
    });
    tb.append(tr);
    data.forEach(element => {
        tr = document.createElement("tr");
         tam.forEach(arr => {
          let td = document.createElement("td");
          td.innerText = element[arr];
          tr.append(td);
         });
        for(i=0;i!=2;i++){
            let btn = document.createElement("button");
            if(i==1)
            btn.innerText = "Modificar"
            else
            btn.innerText = "Eliminar"
            tr.append(btn);
        }
        tb.append(tr);
    });
    main.append(tb);
}
test();