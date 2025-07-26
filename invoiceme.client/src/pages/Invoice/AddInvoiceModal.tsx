import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import invoiceService from '../../services/invoiceService';
import { CreateInvoiceDTO, InvoiceItemDTO } from '../../@types/invoice.type';

import clientService from '../../services/clientService';
import { ClientDTO } from '../../@types/client.type';
import { convertToPHP } from '../../utilities/helpers'

import { Modal } from '../../components/ui/modal/index';
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from '../../components/ui/button/Button';
import Alert from '../../components/ui/alert/Alert';
import DatePicker from "../../components/form/date-picker";
import Input from "../../components/form/input/InputField"
import AddInvoiceItemModal from "./AddInvoiceItemModal";

export interface AddInvoiceModalProps {
    isOpen: boolean;
    onClose: (isSuccess: boolean) => void;
}

class InvalidInput {
    type: string = 'input';
    message: string = '';
    isInvalid: boolean = false;

    constructor(init?: Partial<InvalidInput>) {
        Object.assign(this, init);
    }
}

function AddInvoiceModal(props: AddInvoiceModalProps) {

    const {
        register,
        watch, 
        handleSubmit,
        reset,
        control,
        formState: { errors, touchedFields, isSubmitted },
    } = useForm<CreateInvoiceDTO>({
        defaultValues: {
            Items: [{ Title: '', Qty: 1, UnitPrice: 0 }],
        },
    });

    const [invoiceItems, setInvoiceItems] = useState<InvoiceItemDTO[] | null>(null);

    const [isInvalidInput, setInvalidInput] = useState<InvalidInput>(new InvalidInput());
    const [isLoading, setIsLoading] = useState(false);
    const [dbClients, setDbClients] = useState<ClientDTO[] | null>(null);

    const [isShowAddInvoiceItem, showAddInvoiceItem] = useState(false);

    const [subtotal, setSubtotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const removeItem = (index: number) => {
        if (invoiceItems === null) return;
        setInvoiceItems(prev => prev && prev.filter((_, i) => i !== index));
    }

    const getClientsList = async () => {
        const response = await clientService.getClientsList();
        setDbClients(response);
    };

    const onSubmit = async (payload: CreateInvoiceDTO) => {
        setIsLoading(true);

        payload.Items = invoiceItems ?? [];
        payload.SubTotal = subtotal;
        payload.Tax = tax;
        payload.Total = subtotal + tax;

        const response = await invoiceService.createInvoice(payload);

        if (response.IsSuccess) props.onClose(response.IsSuccess);
        else setInvalidInput(new InvalidInput({ type: 'response', message: response.FailedMessage, isInvalid: true }));

        setIsLoading(false);
        resetModal();
    };

    const handleCancelBtn = () => {
        props.onClose(false);
        setIsLoading(false);
        resetModal();
    };

    const resetModal = () => {
        setInvalidInput(new InvalidInput());
        reset();
    };

    useEffect(() => {
        getClientsList();
    }, []);

    useEffect(() => {
        const computedSubtotal = (invoiceItems ?? []).reduce((sum, item) => {
            return sum + (item.Qty * item.UnitPrice);
        }, 0);

        setSubtotal(computedSubtotal);
        setTotal(computedSubtotal + tax);
    }, [invoiceItems, tax]);

    const watchTax = watch("Tax");

    useEffect(() => {
        setTax(watchTax ? watchTax : 0);
    }, [watchTax]);

    return (
        <Modal isOpen={props.isOpen} className='max-w-2xl m-4' onClose={handleCancelBtn}>
            <AddInvoiceItemModal
                isOpen={isShowAddInvoiceItem}
                onClose={(item) => {
                    if (item) {
                        setInvoiceItems(prev => [...(prev ?? []), item]);
                    }
                    showAddInvoiceItem(false);
                }}
            />
            <div className='p-6 rounded-lg'>
                <p className='font-semibold border-b border-gray-300 pb-2 mb-4'>Add Invoice</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">

                        {(isInvalidInput.type === 'response' && isInvalidInput.isInvalid) && (
                            <Alert variant='error' title='Something went wrong' message={isInvalidInput.message} />
                        )}

                        {(isInvalidInput.type === 'input' && isInvalidInput.isInvalid) && (
                            <Alert variant='warning' title='Invalid input' message={isInvalidInput.message} />
                        )}

                        <div>
                            <Label>Client</Label>
                            <Controller
                                name="ClientId"
                                control={control}
                                rules={{ required: "Client is required" }}
                                render={({ field, fieldState }) => (
                                    <Select
                                        placeholder="Select client"
                                        options={
                                            Array.isArray(dbClients)
                                                ? dbClients.map((client) => ({
                                                    value: client.Id,
                                                    label: client.Name,
                                                }))
                                                : []
                                        }
                                        onChange={field.onChange}
                                        value={field.value ?? undefined}
                                        className={fieldState.invalid ? "border-red-500" : ""}
                                    />
                                )}
                            />
                            {(touchedFields.ClientId || isSubmitted) && errors.ClientId?.message && (
                                <span className="mt-1 block text-xs text-red-500">{errors.ClientId.message}</span>
                            )}
                        </div>

                        <div>
                            <Label>Due date</Label>
                            <Controller
                                name="DueDate"
                                control={control}
                                rules={{ required: "Due date is required" }}
                                render={({ field, fieldState }) => (
                                    <DatePicker
                                        id="start-date-picker"
                                        placeholder="Select due date"
                                        value={field.value}
                                        onChange={field.onChange}
                                        className={fieldState.invalid ? "border-red-500" : ""}
                                    />
                                )}
                            />
                            {(touchedFields.DueDate || isSubmitted) && errors.DueDate?.message && (
                                <span className="mt-1 block text-xs text-red-500">{errors.DueDate.message}</span>
                            )}
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <Label className=''>Tax (optional)</Label>
                            <Input
                                type='number'
                                placeholder="Enter tax"
                                {...register("Tax", { valueAsNumber: true })}
                            />
                        </div>

                        <div className='space-y-4'>
                            <p className='font-semibold'>Invoice Items</p>
                            {
                                invoiceItems === null
                                    ? (
                                        <p className='py-[10px] text-center w-full text-slate-300'>Add invoice item.</p>
                                    ) : (
                                        <table className='w-full'>
                                            <thead className='bg-gray-50'>
                                                <tr>
                                                    <th className='px-4 py-3 text-left font-medium text-gray-700'>Item</th>
                                                    <th className='px-4 py-3 text-left font-medium text-gray-700'>Qty</th>
                                                    <th className='px-4 py-3 text-left font-medium text-gray-700'>Unit Price</th>
                                                    <th className='px-4 py-3 text-left font-medium text-gray-700'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoiceItems.map((item, index) => (
                                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                        <td className='px-4 py-3 font-medium'>{item.Title}</td>
                                                        <td className='px-4 py-3'>{item.Qty}</td>
                                                        <td className='px-4 py-3'>
                                                            {convertToPHP(item.UnitPrice)}
                                                        </td>
                                                        <td className='px-4 py-3'>
                                                            <button
                                                                onClick={() => removeItem(index)}
                                                                className='text-red-600 hover:text-red-800 text-sm'
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )
                            }



                            <Button
                                type='button'
                                className='secondary-btn !bg-gray-100 !border-gray-600 !text-gray-600'
                                onClick={() => showAddInvoiceItem(true)}>
                                Add Item
                            </Button>


                            <div className='bg-emerald-50 rounded-xl p-6 grid grid-cols-2'>
                                <p className='text-gray-500 text-[13px] font-light'>SubTotal:</p>
                                <p className='text-gray-500 text-[13px] font-light text-end'>{convertToPHP(subtotal)}</p>
                                <p className='text-gray-500 text-[13px] font-light'>Tax:</p>
                                <p className='text-gray-500 text-[13px] font-light text-end'>{convertToPHP(tax)}</p>
                                <div className='h-[1px] bg-gray-200 col-span-2 my-[10px]'></div>
                                <p className='text-[14px] font-semibold'>Total:</p>
                                <p className='text-[14px] font-semibold text-end'>{convertToPHP(total)}</p>
                            </div>
                        </div>

                        <div className='flex gap-2 justify-end'>
                            <Button type='button' className='secondary-btn' disabled={isLoading} onClick={handleCancelBtn}>
                                Cancel
                            </Button>
                            <Button type='submit' className='primary-btn' disabled={isLoading}>
                                Submit Invoice
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default AddInvoiceModal;