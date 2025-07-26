
import api from '../config/axiosinstance'

import { ClientDTO } from '../@types/client.type'


class ClientService {

    async getClientsList(): Promise<ClientDTO[] | null> {
        try {
            const response = await api.get('/client/list');
            return response.data;
        }
        catch {
            return null;
        }
    }
}

const clientService = new ClientService();
export default clientService;