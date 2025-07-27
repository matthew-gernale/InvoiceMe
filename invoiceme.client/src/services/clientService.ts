
import api from '../config/axiosinstance'

import { ClientDTO, AddClientDTO, UpdateClientDetailsDTO } from '../@types/client.type'
import { GetPaginatedDTO, PaginatedTableResponse, GeneralResponse } from '../@types/response.type'

import { AxiosError } from 'axios'
import successModalInstance from '../utilities/successModalInstance'
import snackbarInstance from '../utilities/snackbarInstance'



const showError = (errMessage: string) => {
    snackbarInstance.show({
        title: errMessage,
        variant: "error",
        hideDuration: 3000
    });
}

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

    async getClientsPaginated(payload: GetPaginatedDTO): Promise<PaginatedTableResponse<ClientDTO> | null> {
        try {
            const response = await api.get('/client/paginated', {
                params: payload
            });
            return response.data;
        }
        catch {
            return null;
        }
    }

    async getClientById(clientId: number): Promise<ClientDTO | null> {
        try {
            const response = await api.get(`/client/${clientId}`);
            return response.data;
        }
        catch {
            return null;
        }
    }

    async createClient(payload: AddClientDTO): Promise<GeneralResponse<number>> {
        try {
            const response = await api.post('/client/add', payload);

            successModalInstance.show({
                message: 'Client added successfully!',
                hideDuration: 3000,
            });

            return response.data;
        }
        catch (error) {
            const axiosError = error as AxiosError<GeneralResponse<number>>;
            if (axiosError.response) return axiosError.response.data;

            // Fallback in case of network issues or unknown error
            return new GeneralResponse<number>({
                FailedMessage: 'An unexpected error occurred.',
                IsSuccess: false,
                StatusCode: 400,
            });
        }
    }

    async updateClientDetails(payload: UpdateClientDetailsDTO): Promise<GeneralResponse<object>> {
        try {
            const response = await api.put('/client/update', payload);

            successModalInstance.show({
                message: 'Client updated successfully!',
                hideDuration: 3000,
            });

            return response.data;
        }
        catch (error) {
            const axiosError = error as AxiosError<GeneralResponse<object>>;
            if (axiosError.response) return axiosError.response.data;

            // Fallback in case of network issues or unknown error
            return new GeneralResponse<object>({
                FailedMessage: 'An unexpected error occurred.',
                IsSuccess: false,
                StatusCode: 400,
            });
        }
    }

    async updateClientActiveStatus(clientId: number, isActive: boolean): Promise<boolean> {
        try {
            await api.put(`/client/${clientId}`, isActive);

            successModalInstance.show({
                message: `Client ${(isActive ? 'recovered' : 'deleted')} successfully!`,
                hideDuration: 3000,
            });

            return true;
        }
        catch (error) {
            const axiosError = error as AxiosError<GeneralResponse<object>>;
            showError(axiosError.response?.data.FailedMessage ?? 'Error');
            return false;
        }
    }
}

const clientService = new ClientService();
export default clientService;