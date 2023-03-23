var datos;
fetch("http://127.0.0.1:8080/servicios/")
  .then((response) => response.text())
  .then((response) => servicios(response))
  .catch((error) => console.log("error", error));

async function servicios(datos){
  datos = JSON.parse(datos);
  let div = document.getElementById("con");
  datos["data"].forEach(element => {
    let lbl = document.createElement("label");
    let inp = document.createElement("input");
    inp.type = "checkbox";
    inp.name = "servicios";
    inp.value = element.nombre;
    inp.setAttribute("Precio", element.precio);
    inp.addEventListener('change',(Event) =>{
      if(Event.currentTarget.checked){
        valor(inp.getAttribute("Precio"),true);
      }else{
        valor(inp.getAttribute("Precio"),false);
      }
    })
    lbl.append(inp);
    lbl.append(element.nombre);
    div.append(lbl);
    div.append(document.createElement("br"));
  });
}

function valor(val, chk){
  let t = document.getElementById("total");
  let total = parseFloat(t.value);
  val = parseFloat(val);
  console.log(chk);
  if(chk){
    total += val;
  }else{
    total -= val;
  }
  t.value = total;
}
