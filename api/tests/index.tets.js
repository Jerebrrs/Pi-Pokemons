const app = require('../src/app')
const session = require('supertest')
const agent = session(app);

describe("TEST DE RUTAS",()=>{
    describe("GET /pokemons/:id", () => {
        it("Response con status: 200", async () => {
            await agent.get('/pokemons/1').expect(200);
        });
        // it("Si hay error rsponde con sttus 500", async () => {
        //     await agent.get('/pokemons/123232').expect(500);
        // })
    })


})
