const axios = require("axios");
require("dotenv").config();

class PokemonService {
  async getPokemon( id ) {
    console.log("GET");

    const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    // Objeto
    const number = resp.data.id;
    const name = resp.data.name;
    const description = await this.getDescriptionPokemon(number);
    const weight = resp.data.weight;
    const height = resp.data.height;
    const abilities = resp.data.abilities.map( a => { return a.ability.name });
    const price = this.random(1000, 10000);
    const types = resp.data.types.map( a => { return a.type.name });
    const moves = resp.data.moves.slice(0, 4).map( a => { return a.move.name });
    const img = resp.data.sprites.front_default;

    const pokemon = new Object({
      number,
      name,
      description,
      weight,
      height,
      abilities,
      price,
      types,
      moves,
      img,
      score: 0
    });

    return pokemon;
  }

  async getDescriptionPokemon(id) {
    try {
      // https://pokeapi.co/api/v2/characteristic/3/
      const resp = await axios.get(
        `https://pokeapi.co/api/v2/characteristic/${id}`
      );

      const descriptions = resp.data.descriptions;
      const desc = descriptions.filter((d) => {
        if (d.language.name === "en") {
          return d.description;
        }
      });

      return desc[0].description || '';
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

module.exports = new PokemonService();
