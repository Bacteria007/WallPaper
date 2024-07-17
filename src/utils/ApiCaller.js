import axios from "axios";

const ApiKey = '43679375-c1626a2bbc57e252b37e5590f';

const apiUrl = `https://pixabay.com/api/?key=${ApiKey}`;

const formatUrl = (params) => {
    let url = apiUrl + '&per_page=25&safesearch=true&editors_choice=true'
    if (!params) return url;
    let paramKeys = Object.keys(params);
    paramKeys.map((key) => {
        let value = key == 'q' ? encodeURIComponent(params[key]) : params[key]
        url = url + `&${key}=${value}`
    })
    // console.log('final url', url);
    return url

}

export const ApiCall = async (params) => {
    try {
        const { data } = await axios.get(formatUrl(params))
        return { success: true, data: data, message: 'images fetched successfully' }
    } catch (error) {
        console.error(error.message);
        return { success: false, message: error.message, data: {} }
    }
};

