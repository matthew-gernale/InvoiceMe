


import api from '../config/axiosinstance'

import { AddPaymentDTO, PaymentDTO, UpdatePaymentStatusDTO } from '../@types/payment.type'
import { GetPaginatedDTO, PaginatedTableResponse, GeneralResponse, PaginatedCountsResponse } from '../@types/response.type'

import { AxiosError } from 'axios'
import successModalInstance from '../utilities/successModalInstance'

class PaymentService {

    async getPaymentsPaginated(payload: GetPaginatedDTO): Promise<PaginatedTableResponse<PaymentDTO> | null> {
        try {
            const response = await api.get('/payment/paginated', {
                params: payload
            });
            return response.data;
        }
        catch {
            return null;
        }
    }

    async getPaymentCountsByStatus(): Promise<PaginatedCountsResponse | null> {
        try {
            const response = await api.get('/payment/counts');
            return response.data;
        }
        catch {
            return null;
        }
    }

    async createPayment(payload: AddPaymentDTO): Promise<GeneralResponse<PaymentDTO>> {
        try {
            const response = await api.post('/payment/add', payload);

            successModalInstance.show({
                message: 'Payment added successfully!',
                hideDuration: 3000,
            });

            return response.data;
        }
        catch (error) {
            const axiosError = error as AxiosError<GeneralResponse<PaymentDTO>>;
            if (axiosError.response) return axiosError.response.data;

            // Fallback in case of network issues or unknown error
            return new GeneralResponse<PaymentDTO>({
                FailedMessage: 'An unexpected error occurred.',
                IsSuccess: false,
                StatusCode: 400,
            });
        }
    }

    async updatePaymentStatus(payload: UpdatePaymentStatusDTO): Promise<GeneralResponse<object>> {
        try {
            const response = await api.put('/payment/status/update', payload);

            successModalInstance.show({
                message: 'Payment status updated successfully!',
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

const paymentService = new PaymentService();
export default paymentService;