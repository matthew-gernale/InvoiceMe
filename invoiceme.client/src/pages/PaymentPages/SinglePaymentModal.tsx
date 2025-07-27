
import { useState } from "react";

import paymentService from '../../services/paymentService';
import { PaymentDTO, UpdatePaymentStatusDTO } from '../../@types/payment.type';
import { ApprovalStatus } from '../../enums/enum'

import { convertToPHP, formatDate } from '../../utilities/helpers'

import { Modal } from '../../components/ui/modal/index';
import Label from "../../components/form/Label";
import Button from '../../components/ui/button/Button';
import Alert from '../../components/ui/alert/Alert';
import Input from "../../components/form/input/InputField"


export interface SinglePaymentModalProps {
    payment: PaymentDTO;
    isOpen: boolean;
    onClose: (isSuccess: boolean, status?: ApprovalStatus) => void;
}

class InvalidInput {
    type: string = 'input';
    message: string = '';
    isInvalid: boolean = false;

    constructor(init?: Partial<InvalidInput>) {
        Object.assign(this, init);
    }
}

function SinglePaymentModal(props: SinglePaymentModalProps) {

    const [isInvalidInput, setInvalidInput] = useState<InvalidInput>(new InvalidInput());
    const [isLoading, setIsLoading] = useState(false);

    const updatePaymentStatus = async (status: ApprovalStatus) => {
        setIsLoading(true);
        const response = await paymentService.updatePaymentStatus(new UpdatePaymentStatusDTO({ PaymentId: props.payment.Id, Status: status }));
        if (response.IsSuccess) props.onClose(true, status);
        else setInvalidInput(new InvalidInput({ type: 'response', message: response.FailedMessage, isInvalid: true }));
        setIsLoading(false);
    }


    return (
        <Modal isOpen={props.isOpen} className='max-w-2xl m-4' onClose={() => props.onClose(false)}>

            <div className='p-6 rounded-lg'>
                <p className='font-semibold border-b border-gray-300 pb-2 mb-4'>{`Payment #${props.payment.Id}`}</p>


                <div className="space-y-6">

                    {(isInvalidInput.type === 'response' && isInvalidInput.isInvalid) && (
                        <Alert variant='error' title='Something went wrong' message={isInvalidInput.message} />
                    )}

                    <div>
                        <Label>Client</Label>
                        <Input
                            type='string'
                            placeholder="Selected client"
                            disabled
                            value={invoiceDetails.ClientName}
                            className="!opacity-100"
                        />
                    </div>

                    <div>
                        <Label>Invoice date</Label>
                        <Input
                            type='string'
                            placeholder="Invoice date"
                            disabled
                            value={(formatDate(invoiceDetails.InvoiceDate ?? new Date))}
                            className="!opacity-100"
                        />
                    </div>

                    <div>
                        <Label>Due date</Label>
                        <Input
                            type='string'
                            placeholder="Due date"
                            disabled
                            value={(formatDate(invoiceDetails.DueDate ?? new Date))}
                            className="!opacity-100"
                        />
                    </div>


                    {
                        props.payment.Status === ApprovalStatus.PENDING &&
                        <div className='flex gap-2 justify-end'>
                                <Button type='button' className='secondary-btn' disabled={isLoading} onClick={() => updatePaymentStatus(ApprovalStatus.REJECTED)}>
                                Reject
                            </Button>
                            <Button type='button' className='primary-btn' disabled={isLoading} onClick={() => updatePaymentStatus(ApprovalStatus.APPROVED)}>
                                Approve
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </Modal>
    );
}

export default SinglePaymentModal;