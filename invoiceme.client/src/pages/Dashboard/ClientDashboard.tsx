

import { getGreetings } from '../../utilities/helpers'
import authService from '../../services/authService'

function ClientDashboard() {

    const getCustomerName = () => {
        const claims = authService.getUserClaims();
        return claims?.name;
    }

    return (
        <>
            <div className='bg-white border border-gray-300 px-[20px] py-[10px] rounded-xl mb-[20px]'>
                <div className='flex gap-[5px]'>
                    <p className='font-semibold text-[15px] sm:text-[20px] text-emerald-600'>{getGreetings()},</p>
                    <p className='font-semibold text-[15px] sm:text-[20px] text-emerald-600'>{getCustomerName()}</p>
                </div>
                <p className='text-[13px] sm:text-[15px] text-emerald-600'>Welcome to InvoiceMe!</p>
            </div>

        </>
    );
}

export default ClientDashboard;