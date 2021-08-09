import dotenv from "dotenv";
dotenv.config();
import pg from 'pg';
import axios from 'axios';

const connectionString = process.env.DATABASE_URL;
const { Pool } = pg;

const connection = new Pool({
  connectionString,
});

async function populate(){     
  for(let i = 1; i < 250; i ++){
  const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
  if(!result.data.name) continue;  

    const speciesResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
    const description = speciesResult.data.flavor_text_entries[0].flavor_text.split("\n").join(" ")
    console.log(description)
    await connection.query(`INSERT INTO pokemons (id, name, number, image, weight, height, "baseExp", description, "inMyPokemons")
    VALUES ('${result.data.id}', '${result.data.name}', '${result.data.order}', '${result.data.sprites.front_default}', '${result.data.weight}', '${result.data.height}', '${result.data.base_experience}', '${description}', false)`);
}
console.log("cabô")
};

populate();