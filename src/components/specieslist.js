const url = 'https://rickandmortyapi.com/api/character/';
const arr = [];
let i = 0;

const FetchSpecies = async (element) => {
  i += 1;
  const charactersData = [];
  let charactersFetch = [];

  charactersFetch = await fetch(`${url}${element}`);

  const speciesFetch = await charactersFetch.json();

  const speciesArr = speciesFetch.results.map((e) => {
    arr.push(e.species);
  });

  if (i < 35) {
    FetchSpecies(`?page=${i}`);
  }

  const filteredSpecies = [...new Set(arr)];

  return filteredSpecies;
};

export default FetchSpecies;
