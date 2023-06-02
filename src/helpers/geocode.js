import axios from "axios";
import GEOAPIFY_API_KEY from "../../private/keys";

const API_URL = 'https://api.geoapify.com/v1/geocode/search?text=';

async function getCoordinates({city, state, zip}) {
    const result = await axios.get(`${API_URL}${city.replace(/ /g, '%20')+'%20'}${state.replace(/ /g, '%20')+'%20'}${zip.replace(/ /g, '%20')+'%20'}&apiKey=${GEOAPIFY_API_KEY}`);
    return {lat: result.data.features[0].properties.lat,
        long: result.data.features[0].properties.lon}
}

export {getCoordinates}

