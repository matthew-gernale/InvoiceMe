import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { InvoiceItemDTO } from "../../@types/invoice.type";
import { Modal } from "../../components/ui/modal/index";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";

export interface AddInvoiceItemModalProps {
    isOpen: boolean;
    onClose: (item: InvoiceItemDTO | null) => void;
}

function AddInvoiceItemModal({ isOpen, onClose }: AddInvoiceItemModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<InvoiceItemDTO>({
        defaultValues: {
            Title: "",
            Qty: 1,
            UnitPrice: 0,
        }
    });

    const onSubmit = (data: InvoiceItemDTO) => {
        onClose(data);
        reset();
    };

    const handleCancel = () => {
        onClose(null);
        reset();
    };

    useEffect(() => {
        if (!isOpen) reset();
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} className='max-w-md m-4' onClose={handleCancel}>
            <div className='p-6 rounded-lg'>
                <p className='font-semibold border-b border-gray-300 pb-2 mb-4'>Add Invoice Item</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Item Title</Label>
                        <Input
                            {...register("Title", { required: "Item title is required" })}
                            placeholder="Enter item title"
                        />
                        {errors.Title && <span className="text-xs text-red-500">{errors.Title.message}</span>}
                    </div>

                    <div>
                        <Label>Quantity</Label>
                        <Input
                            type="number"
                            {...register("Qty", {
                                required: "Quantity is required",
                                min: { value: 1, message: "Minimum quantity is 1" }
                            })}
                            placeholder="Enter quantity"
                        />
                        {errors.Qty && <span className="text-xs text-red-500">{errors.Qty.message}</span>}
                    </div>

                    <div>
                        <Label>Unit Price</Label>
                        <Input
                            type="number"
                            {...register("UnitPrice", {
                                required: "Unit price is required",
                                min: { value: 0, message: "Unit price cannot be negative" }
                            })}
                            placeholder="Enter unit price"
                        />
                        {errors.UnitPrice && <span className="text-xs text-red-500">{errors.UnitPrice.message}</span>}
                    </div>

                    <div className='flex gap-2 justify-end'>
                        <Button type='button' className='secondary-btn' onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type='submit' className='primary-btn'>
                            Add Item
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default AddInvoiceItemModal;
