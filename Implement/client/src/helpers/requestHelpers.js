import axios from 'axios'
import { RequestMethods } from '../global/Constants'

async function sendRequest(config) {
    try {
        const { url, method, data = {} } = config
        let configs = {
            url: url,
            method: method,
        }
        if (method === RequestMethods.GET) {
            configs = {
                ...configs,
                params: { ...data },
            }
        } else {
            configs = {
                ...configs,
                data: { ...data },
            }
        }

        const response = await axios({
            ...configs,
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

export default sendRequest
