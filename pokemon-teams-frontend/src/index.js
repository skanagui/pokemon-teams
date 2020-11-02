const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", () => {
const mainContainer = document.querySelector("main")
//console.log(mainContainer)


    const getTrainers = () => {

        fetch(TRAINERS_URL)
            .then(response => response.json())
            .then(renderTrainers)
    }

    const renderTrainers = trainers => {
        trainers.forEach(renderTrainer)

    }

    const renderTrainer = trainer => {
        
        const trainerCard = document.createElement("div")
        trainerCard.dataset.id = trainer.id 
        let str = '<ul>'
        trainer.pokemons.forEach(function(ele){
            str += `<li> ${ele.nickname} (${ele.species})<button class="release" data-pokemon-id=${ele.id}>Release</></li>`
        });
        str += '</ul>'
        
        trainerCard.innerHTML = `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
                ${str}
        </div>
        `
        mainContainer.append(trainerCard)
    }

    const submitHandler = () => {
        document.addEventListener('click', e =>{
            if (e.target.textContent === "Add Pokemon"){
            const button = e.target
            const trainerId = button.dataset.trainerId
            //console.log(trainerId)
            postPokemon(trainerId); 
            } 
        
        })
        
        
    }
    
    const postPokemon = (id) => {
        return fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                "trainer_id": id
            }
            )
        
        })
        .then(response => response.json())
        .then(data => {
        addPokemon(id)})
    }
    


    submitHandler();
    getTrainers();

    
})
  
  /*  ## Requirements
- When a user loads the page, they should see all
  trainers, with their current team of Pokemon.
  -get request to trainers
  -iterations through those trainers
  -add to element 
  post on the dom


- Whenever a user hits `Add Pokemon` and they have
  space on their team, they should get a new Pokemon.
  -click handler
  -post to pokemon 

- Whenever a user hits `Release Pokemon` on a specific
  Pokemon team, that specific Pokemon should be released from
  the team.
  -delete event handler 

    

```
#=> Example Request
POST /pokemons

Required Headers:
{
  'Content-Type': 'application/json'
}

Required Body:
{
  "trainer_id": 1
}

#=> Example Response
{
  "id":147,
  "nickname":"Gunnar",
  "species":"Weepinbell",
  "trainer_id":1
}
```
*/
