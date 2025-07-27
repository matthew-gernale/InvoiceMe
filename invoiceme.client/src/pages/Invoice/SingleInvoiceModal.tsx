
import { useState, useEffect } from "react";

import invoiceService from '../../services/invoiceService';
import { InvoiceDTO, InvoiceDetailsDTO } from '../../@types/invoice.type';
import { InvoiceStatus } from '../../enums/enum'

import { convertToPHP, formatDate } from '../../utilities/helpers'

import { Modal } from '../../components/ui/modal/index';
import Label from "../../components/form/Label";
import Button from '../../components/ui/button/Button';
import Alert from '../../components/ui/alert/Alert';
import Input from "../../components/form/input/InputField"


export interface SingleInvoiceModalProps {
    selectedInvoice: InvoiceDTO;
    isOpen: boolean;
    onClose: (isSuccess: boolean, status?: InvoiceStatus) => void;
}

class InvalidInput {
    type: string = 'input';
    message: string = '';
    isInvalid: boolean = false;

    constructor(init?: Partial<InvalidInput>) {
        Object.assign(this, init);
    }
}

function SingleInvoiceModal(props: SingleInvoiceModalProps) {

    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetailsDTO | null>(null);

    const [isInvalidInput, setInvalidInput] = useState<InvalidInput>(new InvalidInput());
    const [isLoading, setIsLoading] = useState(false);

    const getInvoiceDetails = async () => {
        const response = await invoiceService.getInvoiceDetailsById(props.selectedInvoice.Id);
        setInvoiceDetails(response);
    }

    const updateInvoiceStatus = async (status: InvoiceStatus) => {
        setIsLoading(true);
        const response = await invoiceService.updateInvoiceStatus({ InvoiceId: props.selectedInvoice.Id, Status: status });
        if (response.IsSuccess) props.onClose(true, status);
        else setInvalidInput(new InvalidInput({ type: 'response', message: response.FailedMessage, isInvalid: true }));
        setIsLoading(false);
    }


    useEffect(() => {
        const fetchData = async () => {
            await getInvoiceDetails();
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getInvoiceDetails();
        }

        fetchData();
    }, [props.selectedInvoice]);

  return (
      <Modal isOpen={props.isOpen} className='max-w-2xl m-4' onClose={() => props.onClose(false)}>
          
          <div className='p-6 rounded-lg'>
              <p className='font-semibold border-b border-gray-300 pb-2 mb-4'>{`Invoice #${props.selectedInvoice.InvoiceNo}`}</p>

              {
                  invoiceDetails === null
                      ? <p className='font-light text-gray-500'>Invoice details not found.</p>
                      :
                      (
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

                              <div className='space-y-4'>
                                  <p className='font-semibold'>Invoice Items</p>
                                  {
                                      invoiceDetails.InvoiceItems === null
                                          ? (
                                              <p className='py-[10px] text-center w-full text-slate-300'>Add invoice item.</p>
                                          ) : (
                                              <table className='w-full'>
                                                  <thead className='bg-gray-50'>
                                                      <tr>
                                                          <th className='px-4 py-3 text-left font-medium text-gray-700'>Item</th>
                                                          <th className='px-4 py-3 text-left font-medium text-gray-700'>Qty</th>
                                                          <th className='px-4 py-3 text-left font-medium text-gray-700'>Unit Price</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      {invoiceDetails.InvoiceItems?.map((item, index) => (
                                                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                              <td className='px-4 py-3 font-medium'>{item.Title}</td>
                                                              <td className='px-4 py-3'>{item.Qty}</td>
                                                              <td className='px-4 py-3'>
                                                                  {convertToPHP(item.UnitPrice || 0)}
                                                              </td>
                                                          </tr>
                                                      ))}
                                                  </tbody>
                                              </table>
                                          )
                                  }



                                  <div className='bg-emerald-50 rounded-xl p-6 grid grid-cols-2'>
                                      <p className='text-gray-500 text-[13px] font-light'>SubTotal:</p>
                                      <p className='text-gray-500 text-[13px] font-light text-end'>{convertToPHP(invoiceDetails.SubTotal || 0)}</p>
                                      <p className='text-gray-500 text-[13px] font-light'>Tax:</p>
                                      <p className='text-gray-500 text-[13px] font-light text-end'>{convertToPHP(invoiceDetails.Tax || 0)}</p>
                                      <div className='h-[1px] bg-gray-200 col-span-2 my-[10px]'></div>
                                      <p className='text-[14px] font-semibold'>Total:</p>
                                      <p className='text-[14px] font-semibold text-end'>{convertToPHP(invoiceDetails.Total || 0)}</p>
                                  </div>
                              </div>

                              {
                                  invoiceDetails.Status !== InvoiceStatus.CANCELLED && invoiceDetails.Status !== InvoiceStatus.PAID &&
                                  <div className='flex gap-2 justify-end'>
                                      <Button type='button' className='secondary-btn' disabled={isLoading} onClick={() => updateInvoiceStatus(InvoiceStatus.CANCELLED)}>
                                          Mark as cancelled
                                      </Button>
                                      <Button type='button' className='primary-btn' disabled={isLoading} onClick={() => updateInvoiceStatus(InvoiceStatus.PAID)}>
                                          Mark as paid
                                      </Button>
                                  </div>
                              }
                          </div>
                      )
              }
          </div>
      </Modal>
  );
}

export default SingleInvoiceModal;