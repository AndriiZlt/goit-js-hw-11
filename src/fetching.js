import { getRefs } from './refs';

const { axios } = getRefs();

export async function fetchingQuery(query, page) {
  let RESULTSPERPAGE = 40;
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=6707322-7bfef4d2355bcd2c21033e4e5&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${RESULTSPERPAGE}&page=${page}`
    );
    return await response.data;
  } catch (error) {
    console.log('catch error', error);
  }
}
