// Elementos del DOM
const tituloCard = document.getElementById("tituloCard");
const namePokemon = document.getElementById("nombre_pokemon");
const imgPokemon = document.getElementById("img");

const idPokemon = document.getElementById("idPokemon");
const pesoPokemon = document.getElementById("pesoPokemon");
const alturaPokemon = document.getElementById("alturaPokemon");
const habilidadesPokemon = document.getElementById("habilidadesPokemon");

const inputBuscarNombre = document.getElementById("inputBuscarNombre");
const btnBuscarNombre = document.getElementById("btnBuscarNombre");

const inputBuscarID = document.getElementById("inputBuscarID");
const btnBuscarID = document.getElementById("btnBuscarID");

// Función para obtener datos
async function obtenerPokemon(param) {
  try {
    tituloCard.textContent = "Buscando Pokémon...";
    namePokemon.textContent = "";
    imgPokemon.src = "";
    imgPokemon.alt = "Cargando...";

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${param.toLowerCase()}`);
    if (!res.ok) throw new Error("No encontrado");

    const datos = await res.json();

    tituloCard.textContent = "¡Pokémon Encontrado!";
    namePokemon.textContent = datos.name;

    imgPokemon.src = datos.sprites.other["official-artwork"].front_default
                  || datos.sprites.other.dream_world.front_default
                  || datos.sprites.front_default
                  || "";
    imgPokemon.alt = datos.name;

    idPokemon.textContent = datos.id;
    pesoPokemon.textContent = (datos.weight / 10) + " kg";
    alturaPokemon.textContent = (datos.height / 10) + " m";

    // Habilidades como lista
    habilidadesPokemon.innerHTML = "";
    datos.abilities.forEach(h => {
      const li = document.createElement("li");
      li.textContent = h.ability.name;
      habilidadesPokemon.appendChild(li);
    });

  } catch (err) {
    tituloCard.textContent = "Error";
    namePokemon.textContent = "Pokémon no encontrado";
    imgPokemon.src = "";
    imgPokemon.alt = "Sin imagen";
    idPokemon.textContent = "";
    pesoPokemon.textContent = "";
    alturaPokemon.textContent = "";
    habilidadesPokemon.innerHTML = "";
    console.error(err);
  }
}

// Mostrar por defecto un Pokémon
obtenerPokemon("pikachu");

// Eventos
btnBuscarNombre.addEventListener("click", () => {
  if (inputBuscarNombre.value.trim()) {
    obtenerPokemon(inputBuscarNombre.value.trim());
  }
});
btnBuscarID.addEventListener("click", () => {
  if (inputBuscarID.value.trim()) {
    obtenerPokemon(inputBuscarID.value.trim());
  }
});
inputBuscarNombre.addEventListener("keyup", e => {
  if (e.key === "Enter") obtenerPokemon(inputBuscarNombre.value.trim());
});
inputBuscarID.addEventListener("keyup", e => {
  if (e.key === "Enter") obtenerPokemon(inputBuscarID.value.trim());
});
