import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(request => request.data)
}

const update = (id, newObject = 'delete') => {
    let request
    const updateURL = `${baseURL}/${id}`
    if (newObject === 'delete')
        request = axios.delete(updateURL)
    else
        request = axios.put(updateURL, newObject)

    return request.then(response => response.data)
}

const numbersService = {
    getAll,
    create,
    update
}

export default numbersService