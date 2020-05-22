document.addEventListener('DOMContentLoaded', function(){
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`

    const trainersDiv = document.querySelector('.forTrainers')
    

fetch(TRAINERS_URL).then(res => res.json()).then(trainers => addTrainerToDom(trainers))

function addTrainerToDom(array){
    trainersDiv.innerHTML = ''
    array.forEach(obj => { 
    const trainerCard = document.createElement('div')
    trainerCard.setAttribute('class', 'card')
    trainerCard.setAttribute('data-id', `${obj.id}`)
    trainerCard.innerHTML = `<p>${obj.name}</p><button data-trainer-id="${obj.id}">Add Pokemon</button><ul></ul>`
            obj.pokemons.forEach(poke => {
            const pokemonLi = document.createElement('li')
            pokemonLi.innerHTML = `${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id="${poke.id}">Release</button></li>`
            const listOfPokemon =trainerCard.querySelector('ul')
            listOfPokemon.appendChild(pokemonLi)
            })
    trainersDiv.appendChild(trainerCard)
})
}

document.addEventListener('click', function(e){
    if (e.target.className == 'release'){
        const pokemonId = e.target.dataset.pokemonId
        fetch(`${POKEMONS_URL}/${pokemonId}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                accept: "application/json"
            }
        }).then(res => res.json()).then(res => console.log(res))
        e.target.parentElement.remove()
    } else if (e.target.innerText == 'Add Pokemon'){
        const trainerID = e.target.parentElement.dataset.id
            fetch(POKEMONS_URL, {
                method: 'POST',
                headers: {
                "content-type": "application/json"
                },
                body: JSON.stringify({
                    'trainer_id': trainerID
                })
            }).then(res => res.json()).then(poke => {
                const pokeList = e.target.parentElement.querySelector('ul')
                const pokemonLi = document.createElement('li')
                pokemonLi.innerHTML = `${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id="${poke.id}">Release</button></li>`
                pokeList.appendChild(pokemonLi)
            })
        }
})






})