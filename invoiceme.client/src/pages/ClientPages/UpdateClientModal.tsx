import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import clientService from '../../services/clientService';
import { UpdateClientDetailsDTO, ClientDTO } from '../../@types/client.type';

import { Modal } from '../../components/ui/modal/index';
import Label from "../../components/form/Label";
import Button from '../../components/ui/button/Button';
import Alert from '../../components/ui/alert/Alert';
import Input from "../../components/form/input/InputField"

export interface UpdateClientModalProps {
    client: ClientDTO;
    isOpen: boolean;
    onClose: (isSuccess: boolean, newClient: ClientDTO) => void;
}

class InvalidInput {
    type: string = 'input';
    message: string = '';
    isInvalid: boolean = false;

    constructor(init?: Partial<InvalidInput>) {
        Object.assign(this, init);
    }
}

function UpdateClientModal(props: UpdateClientModalProps) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, touchedFields, isSubmitted },
    } = useForm<UpdateClientDetailsDTO>();

    const [isInvalidInput, setInvalidInput] = useState<InvalidInput>(new InvalidInput());
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (payload: UpdateClientDetailsDTO) => {
        setIsLoading(true);

        const response = await clientService.updateClientDetails(payload);

        if (response.IsSuccess) {
            const newClient = new ClientDTO({
                Id: payload.ClientId,
                Name: `${payload.FirstName} ${payload.LastName}`,
                Contact: payload.Phone,
                Email: payload.Email,
                Address: payload.Address
            });
            props.onClose(response.IsSuccess, newClient);
        }
        else setInvalidInput(new InvalidInput({ type: 'response', message: response.FailedMessage, isInvalid: true }));

        setIsLoading(false);
        resetModal();
    };

    const handleCancelBtn = () => {
        props.onClose(false, new ClientDTO());
        setIsLoading(false);
        resetModal();
    };

    const resetModal = () => {
        setInvalidInput(new InvalidInput());
        reset({
            ClientId: props.client.Id,
            Email: props.client.Email,
            Phone: props.client.Contact,
            Address: props.client.Address,
        });
    };

    useEffect(() => {
        if (props.isOpen && props.client) {
            resetModal();
        }
    }, [props.client, props.isOpen, reset]);

    return (
        <Modal isOpen={props.isOpen} className='max-w-2xl m-4' onClose={handleCancelBtn}>
            <div className='p-6 rounded-lg'>
                <p className='font-semibold border-b border-gray-300 pb-2 mb-4'>Update client details</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">

                        {(isInvalidInput.type === 'response' && isInvalidInput.isInvalid) && (
                            <Alert variant='error' title='Something went wrong' message={isInvalidInput.message} />
                        )}

                        {(isInvalidInput.type === 'input' && isInvalidInput.isInvalid) && (
                            <Alert variant='warning' title='Invalid input' message={isInvalidInput.message} />
                        )}


                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-[10px]'>
                            <div className="sm:col-span-2">
                                <Label>Email</Label>
                                <Input
                                    type='string'
                                    placeholder="Enter email"
                                    {...register("Email", {
                                        required: "Email is required",
                                    })}
                                    error={!!errors.Email}
                                    hint={
                                        touchedFields.Email || isSubmitted
                                            ? errors.Email?.message
                                            : ""
                                    }
                                />
                            </div>
                            <div className="">
                                <Label>First Name</Label>
                                <Input
                                    type='string'
                                    placeholder="Enter first name"
                                    {...register("FirstName", {
                                        required: "First name is required",
                                    })}
                                    error={!!errors.FirstName}
                                    hint={
                                        touchedFields.FirstName || isSubmitted
                                            ? errors.FirstName?.message
                                            : ""
                                    }
                                />
                            </div>
                            <div className="">
                                <Label>Last Name</Label>
                                <Input
                                    type='string'
                                    placeholder="Enter first name"
                                    {...register("LastName", {
                                        required: "Last name is required",
                                    })}
                                    error={!!errors.LastName}
                                    hint={
                                        touchedFields.LastName || isSubmitted
                                            ? errors.LastName?.message
                                            : ""
                                    }
                                />
                            </div>
                            <div className="">
                                <Label>Contact No.</Label>
                                <Input
                                    type='string'
                                    placeholder="Enter contact number"
                                    {...register("Phone", {
                                        required: "Contact number is required",
                                    })}
                                    error={!!errors.Phone}
                                    hint={
                                        touchedFields.Phone || isSubmitted
                                            ? errors.Phone?.message
                                            : ""
                                    }
                                />
                            </div>
                            <div className="">
                                <Label>Address</Label>
                                <Input
                                    type='string'
                                    placeholder="Enter Address"
                                    {...register("Address", {
                                        required: "Address is required",
                                    })}
                                    error={!!errors.Address}
                                    hint={
                                        touchedFields.Address || isSubmitted
                                            ? errors.Address?.message
                                            : ""
                                    }
                                />
                            </div>
                        </div>

                        <div className='flex gap-2 justify-end'>
                            <Button type='button' className='secondary-btn' disabled={isLoading} onClick={handleCancelBtn}>
                                Cancel
                            </Button>
                            <Button type='submit' className='primary-btn' disabled={isLoading}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default UpdateClientModal;