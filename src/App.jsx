import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState("pikachu");
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getPokemon() {

    document.title = "Pokemon !"
    setIsLoading(true);
    try {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let pokemonData = await res.json();
      setData(pokemonData);
    } catch (err) {
      setData(false);
      setErr(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getPokemon();
    console.log(data);
  }, [])



  function handleSubmit(e) {
    e.preventDefault();
    getPokemon();
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-blue-700">
      <div className="bg-white text-center rounded-3xl border shadow-lg p-10 max-w-xs">
        <form onSubmit={handleSubmit}>
          <motion.input onChange={(e) => setName(e.target.value)} value={name} whileHover={{ scale: 1.1 }} type='text' className='p-3 border-solid border-2 border-blue-500 rounded-md' placeholder="Search by name . . ."></motion.input>
          <motion.button whileHover={{ scale: 1.1 }} className="bg-blue-500 px-2 mt-5 text-lg rounded text-gray-100 hover:bg-blue-700 hover:">Search</motion.button>
        </form>
        {err ? (
          <p className='my-5'>no pokemon data found!</p>
        ) : (
          <>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <motion.img whileHover={{ scale: 1.15 }} className='my-5 w-50 h-50 rounded-xl mx-auto' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt={`$(data.name)`} />
                <h1 className='mt-3 text-lg text-gray-700'>{data.name}</h1>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
