
import api from '../config/axiosinstance'

import { InvoiceDTO, CreateInvoiceDTO, UpdateInvoiceStatusDTO, InvoiceDetailsDTO } from '../@types/invoice.type'
import { GetPaginatedDTO, PaginatedTableResponse, GeneralResponse, PaginatedCountsResponse } from '../@types/response.type'

import { AxiosError } from 'axios'
import successModalInstance from '../utilities/successModalInstance'

class InvoiceService {

    async getInvoicesPaginated(payload: GetPaginatedDTO): Promise<PaginatedTableResponse<InvoiceDTO> | null> {
        try {
            const response = await api.get('/invoice/paginated', {
                params: payload
            });
            return response.data;
        }
        catch {
            return null;
        }
    }

    async getInvoiceCountsByStatus(): Promise<PaginatedCountsResponse | null> {
        try {
            const response = await api.get('/invoice/counts');
            return response.data;
        }
        catch {
            return null;
        }
    }

    async getInvoiceDetailsById(invoiceId: number): Promise<InvoiceDetailsDTO | null> {
        try {
            const response = await api.get(`/invoice/${invoiceId}`);
            return response.data;
        }
        catch {
            return null;
        }
    }

    async createInvoice(payload: CreateInvoiceDTO): Promise<GeneralResponse<object>> {
        try {
            const response = await api.post('/invoice/add', payload);

            successModalInstance.show({
                message: 'Invoice added successfully!',
                hideDuration: 3000,
            });

            return response.data;
        }
        catch(error) {
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

    async updateInvoiceStatus(payload: UpdateInvoiceStatusDTO): Promise<GeneralResponse<object>> {
        try {
            const response = await api.put  ('/invoice/update', payload);

            successModalInstance.show({
                message: 'Invoice status updated successfully!',
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
                StatusCode: 400
            });
        }
    }
}

const invoiceService = new InvoiceService();
export default invoiceService;