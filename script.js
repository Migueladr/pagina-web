// Datos: mg de hierro por 100 g (valores aproximados)
const alimentos = [
  { nombre: "Semillas de calabaza", mg: 8.8, tipo: "vegetal", nota: "Un puñado sobre avena o ensaladas." },
  { nombre: "Mejillones y almejas", mg: 7, tipo: "animal", nota: "Entre las fuentes marinas más ricas." },
  { nombre: "Hígado de res", mg: 6, tipo: "animal", nota: "Muy rico en hierro; consúmelo con moderación." },
  { nombre: "Espinacas cocidas", mg: 3.6, tipo: "vegetal", nota: "Añade limón para absorber más." },
  { nombre: "Lentejas cocidas", mg: 3.3, tipo: "vegetal", nota: "Combínalas con tomate o pimiento." },
  { nombre: "Sardinas en lata", mg: 2.9, tipo: "animal", nota: "Económicas y fáciles de guardar." },
  { nombre: "Garbanzos cocidos", mg: 2.9, tipo: "vegetal", nota: "Buenos en ensaladas, guisos y hummus." },
  { nombre: "Tofu firme", mg: 2.7, tipo: "vegetal", nota: "Alternativa útil en dietas vegetarianas." },
  { nombre: "Carne de res magra", mg: 2.6, tipo: "animal", nota: "Hierro hemo de buena absorción." },
  { nombre: "Huevo cocido", mg: 1.8, tipo: "animal", nota: "Aporta poco, pero es fácil de incluir cada día." },
  { nombre: "Quinoa cocida", mg: 1.5, tipo: "vegetal", nota: "Sustituye al arroz blanco con más nutrientes." }
];

const lista = document.getElementById("lista");
const botones = document.querySelectorAll(".filtro");
const maximo = Math.max(...alimentos.map(a => a.mg));

function mostrar(tipo) {
  lista.innerHTML = "";
  const filtrados = alimentos.filter(a => tipo === "todos" || a.tipo === tipo);

  filtrados.forEach(a => {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
      <div class="item-cab">
        <span class="item-nombre">${a.nombre} <span class="etiqueta">(${a.tipo === "animal" ? "hemo" : "no hemo"})</span></span>
        <span class="item-mg">${a.mg} mg</span>
      </div>
      <div class="barra"><span data-ancho="${(a.mg / maximo) * 100}"></span></div>
      <p class="item-nota">${a.nota}</p>`;
    lista.appendChild(li);
  });

  // Anima las barras después de insertarlas
  requestAnimationFrame(() => {
    lista.querySelectorAll(".barra span").forEach(b => {
      b.style.width = b.dataset.ancho + "%";
    });
  });
}

botones.forEach(btn => {
  btn.addEventListener("click", () => {
    botones.forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");
    mostrar(btn.dataset.tipo);
  });
});

document.getElementById("anio").textContent = new Date().getFullYear();
mostrar("todos");
