/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  beforeAll(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });

  describe('GET /pokemons/:id', () => {
    it('Response con status: 200', async () => {
      await agent.get('/pokemons/1').expect(200);
    });
    it('Responde un Objeto con las propiedades: "id","name","image", "hp","attack","defense","speed","height" e"weight"', async () => {
      const response = await agent.get('/pokemons/1').expect(200);
      const responseBody = response.body;
      //{body es lo que me devuelve el back}
      expect(responseBody).to.haveOwnProperty("id");
      expect(responseBody).to.haveOwnProperty("name");
      expect(responseBody).to.haveOwnProperty("image");
      expect(responseBody).to.haveOwnProperty("attack");
      expect(responseBody).to.haveOwnProperty("defense");
      expect(responseBody).to.haveOwnProperty("speed");
      expect(responseBody).to.haveOwnProperty("height");
      expect(responseBody).to.haveOwnProperty("weight");
    })
    it("Si hay un error responde con Status : 500", async () => {
      const response = await agent.get('/pokemons/1342342');
      expect(response.status).to.equal(404);
    })
  });

  describe("POST /pokemons/", () => {
    it("Devuelve el objeto del Pokémon creado", async () => {
      const newPokemon = {
        "name": "asdasd",
        "hp": 39,
        "attack": 52,
        "defense": 43,
        "speed": 65,
        "height": 6,
        "weight": 85,
        "image": "sada",
        "type": "Fire"
      };
    
      const response = await agent.post('/pokemons/').send(newPokemon);
    
      expect(response.status).to.be.equal(200); // Verifica que la respuesta tenga un status 200
      expect(response.body).to.have.property("id"); // Verifica que la respuesta contenga un id generado
      expect(response.body).to.have.property("name", newPokemon.name);
      expect(response.body).to.have.property("image", newPokemon.image);
      expect(response.body).to.have.property("hp", newPokemon.hp);
      expect(response.body).to.have.property("attack", newPokemon.attack);
      expect(response.body).to.have.property("defense", newPokemon.defense);
      expect(response.body).to.have.property("speed", newPokemon.speed);
      expect(response.body).to.have.property("height", newPokemon.height);
      expect(response.body).to.have.property("weight", newPokemon.weight);
      expect(response.body).to.have.property("createdInDb", true);
      expect(response.body.types).to.deep.equal([]); // Verifica que el array de types esté vacío
    });
  })



})
