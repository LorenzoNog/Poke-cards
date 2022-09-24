
document.addEventListener('DOMContentLoaded', ()=>{
    const random = getRandomNum(1,151)
    fetchData(random)
})

const getRandomNum = (min, max)=>{
    return Math.floor(Math.random() * (max-min)) + min;
}

const fetchData = async (id)=>{
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        console.log(data)

        const pokemon = {
            img : data.sprites.other.dream_world.front_default,
            name : data.name,
            hp : data.stats[0].base_stat 

        }

        crearPokemon(data)
    } catch (error) {
        console.log(error)
    }
}

function crearPokemon(pokemon){
    const flex = document.querySelector('.flex');
    flex.classList.add('flex');
    
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment()

    clone.querySelector('.foto').setAttribute('src', pokemon.sprites.other.dream_world.front_default);
    clone.querySelector('.nombre').textContent = `${pokemon.name}`
    clone.querySelector('.stat').textContent = `${pokemon.stats[0].base_stat} base stat`
    clone.querySelector('.city').textContent = `${pokemon.base_experience} Exp`
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = `${pokemon.stats[1].base_stat}K`;
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = `${pokemon.abilities[0].ability.name}`;
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = `${pokemon.weight}Kg`
    
    fragment.appendChild(clone);
    flex.appendChild(fragment)
}

