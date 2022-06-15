import axios from 'axios'
const baseUrl = '/api/messages'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const config = {
        headers: { Authorization: token }
    }

    return await axios.get(baseUrl, config)
}

const sendMessage = async (content, targetUserId) => {
    const config = {
        headers: { Authorization: token }
    }

    const message = {
        content,
        to: targetUserId
    }

    return await axios.post(baseUrl, message, config)
}

export default { setToken, getAll, sendMessage }
