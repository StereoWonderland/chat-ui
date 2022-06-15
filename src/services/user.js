import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async (id) => {
    const users = await axios.get(baseUrl)
    return users
}

export default { getAll }
