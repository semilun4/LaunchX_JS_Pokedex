// pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png");

// Creamos una seleccion de colores para los elementos de cada pokemon
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

// Primero armaremos la url de la que iremos consultando distintas cosas
// en la api pokeapi.com

const fetchPokemon = event => {
    // Evitamos que se recarge la pag al hacer enter
    event.preventDefault();
    const pokeInput = document.getElementById("poke-input");
    let pokeName = pokeInput.value.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        // console.log(res);
        // Si no encontramos el pokemon, se muestra el error
        if(res.status != "200") {
            pokeImage("./img/error.gif");
            document.getElementById("poke-id").innerHTML = "404";
			document.getElementById("poke-name").innerHTML = "ERROR";

            pokeElement1.style.display = 'none';
            pokeElement2.style.display = 'none';
			// document.getElementById("pokemonTipo").innerHTML = "";
			// document.getElementById("pokeStats").innerHTML = "";
			// document.getElementById("pokeMoves").innerHTML = "";
			// document.getElementsByClassName("botones").style.display = "none";

        } else {
            return res.json();
        }
            
    }).then((data) => {
        console.log(data);

        // Imagen del pokemon
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg);
        console.log(pokeImg);

        // ID del pokemon
        let pokeId = data.id;
        pokeNumber(pokeId);
        console.log(pokeId);
        
        // Nombre del pokemon
        let pokeMon = data.name;
        pokemonName(pokeMon);
        console.log(pokeMon);

        // Tipo de pokemon
        let pokeElement = data.types.map(typ => typ.type.name);
        console.log(pokeElement.length);

        // Si el pokemon tiene dos tipos
        let pokeTypesNumber = pokeElement.length
        if (pokeTypesNumber == 2){            
            let type1 = pokeElement[0];                 
            let type2 = pokeElement[1];
            pokeTypes(type1,type2,pokeTypesNumber)
            pokeColors(pokeElement)
        }
        else{
            // Solo un tipo 
            let type1 = pokeElement[0];
            
            pokeTypes(type1,'',pokeTypesNumber)
            
            
        }
    })
}



const pokeImage = (url) => {
    const pokeImg = document.getElementById("poke-img");
    // url la sacamos de la API
    pokeImg.src = url;
}

const pokeNumber = (url) => {
     const pokeId = document.getElementById("poke-id");
     pokeId.innerHTML = ('#'+ url + ' ');
}

const pokemonName = (url) => {
    const pokeMon = document.getElementById("poke-name");
    pokeMon.innerHTML = (url);
}

const pokeTypes = (type1, type2, pokeTypesNumber) => {
    const pokeElement1 = document.getElementById("poke-type1");
    const pokeElement2 = document.getElementById("poke-type2");

    pokeElement1.style.display = 'inline';
    pokeElement2.style.display = 'inline';

    pokeElement1.innerHTML = (type1);
    pokeElement2.innerHTML = (type2);

    if (pokeTypesNumber == 1){
         pokeElement2.style.display = 'none';
     }

}

const pokeColors = (pokeElement) => {

    // const pokeElement1 = document.getElementById("poke-type1");
    // pokeElement1.innerHTML = '';
    // const pokeElement2 = document.getElementById("poke-type2");
    // pokeElement2.innerHTML = '';
    pokeElement.forEach(pokeColor =>  pokeColor = typeColors[pokeColor]);
}
