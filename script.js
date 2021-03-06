// pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png");

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
