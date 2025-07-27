
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import clientService from '../../services/clientService'
import { ClientDTO } from '../../@types/client.type'

import PageMeta from "../../components/common/PageMeta"
import PageBreadCrumb from '../../components/common/PageBreadCrumb'
import { FiMessageSquare, FiPhone } from "react-icons/fi"
import { MdOutlineMailOutline } from "react-icons/md"
import TabButton from '../../components/custom/Button/TabButton'
import SingleClientInvoice from '../Invoice/SingleClientInvoice'
import TableSkeleton from '../../components/skeleton/TableSkeleton'
import UpdateClientModal from './UpdateClientModal'
import { SquarePen } from 'lucide-react';





function ClientDetailsPage() {
    const { clientId } = useParams<{ clientId: string }>();
    const clientIntId = parseInt(clientId ?? '');

    const [clientDetails, setClientDetails] = useState<ClientDTO>(new ClientDTO());
    const [isLoading, setIsLoading] = useState(false);
    const [isShowUpdateClientModal, showUpdateClientModal] = useState(false);

    const getCustomerDetails = async () => {
        setIsLoading(true);
        const response = await clientService.getClientById(clientIntId);
        setClientDetails(response ?? new ClientDTO());
        setIsLoading(false);
    }


    const tabGroups = [
        'Invoices',
        'Payments'
    ];

    const [currTab, setCurrTab] = useState<string>('Invoices');

    const renderTabContent = (): React.ReactNode => {
        switch (currTab) {
            case 'Invoices':
                return <SingleClientInvoice clientId={clientIntId} />

            case 'Payments':
                return <p>Payments</p>
        }
    }

    const handleUpdateClientResult = (isSuccess: boolean, newClient: ClientDTO) => {
        if (isSuccess) setClientDetails(newClient);
        showUpdateClientModal(false);
    }

    useEffect(() => {
        getCustomerDetails();
    }, [clientId]);

    return (
        <>
            <PageMeta
                title={`InvoiceMe | Client Details`}
                description={`This page shows client details`}
            />

            <UpdateClientModal isOpen={isShowUpdateClientModal} onClose={handleUpdateClientResult} client={clientDetails} />

            <PageBreadCrumb
                currentPage='Client Details'
                previousPage={`Clients`}
                previousPageIcon={null}
                previousPageLink={`/clients`}
                pageTitle={`Client Details`}
            />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px]'>
                <div className='col-span-1 border dark:border-white/[0.05] rounded-xl px-5 py-10 bg-white relative'>

                    <div className='w-full flex items-start justify-end mt-[-20px]'>
                        <SquarePen className='cursor-pointer stroke-gray-500' onClick={() => showUpdateClientModal(true)} />
                    </div>

                    <div className='flex flex-col items-center text-center border-b border-gray-200 pb-[20px]'>

                        <div className='w-24 h-24 rounded-full mb-3 border-2 border-gray-300 dark:border-gray-600 bg-gray-100 overflow-hidden flex items-center justify-center'>
                            <p className='text-center text-[13px] !text-gray-400'>No image</p>
                        </div>

                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {clientDetails.Name}
                        </h2>

                        <p className="text-xs !text-gray-500 dark:text-gray-400">
                            Client
                        </p>

                        <div className="mt-5 flex flex-wrap justify-center gap-4">
                            {[
                                {
                                    label: "Message",
                                    icon: <FiMessageSquare />,
                                    onClick: () => {
                                        if (clientDetails.Contact) {
                                            window.open(`sms:${clientDetails.Contact}`, "_self");
                                        }
                                    },
                                },
                                {
                                    label: "Email",
                                    icon: <MdOutlineMailOutline />,
                                    onClick: () => {
                                        if (clientDetails.Email) {
                                            window.open(`mailto:${clientDetails.Email}`, "_self");
                                        }
                                    },
                                },
                                {
                                    label: "Call",
                                    icon: <FiPhone />,
                                    onClick: () => {
                                        if (clientDetails.Contact) {
                                            window.open(`tel:${clientDetails.Contact}`, "_self");
                                        }
                                    },
                                },
                            ].map(({ label, icon, onClick }, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <button
                                        onClick={onClick}
                                        className="
          flex justify-center items-center w-10 h-10 rounded-full border 
          text-gray-700 bg-gray-100 border-gray-300
          hover:bg-gray-200 hover:text-black
          dark:text-gray-200 dark:bg-white/5 dark:border-gray-600
          dark:hover:bg-white/10 dark:hover:text-white
          transition-colors duration-150
        "
                                    >
                                        {icon}
                                    </button>
                                    <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 px-3 text-start">
                        <div className="mb-5">
                            <p className="text-sm dark:text-gray-300">
                                Email Address
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-semibold">
                                {clientDetails.Email}
                            </p>
                        </div>
                        <div className="mb-5">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Phone Number
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-semibold">
                                {clientDetails.Contact}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Address
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-semibold">
                                {clientDetails.Address}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='col-span-2 border dark:border-white/[0.05] rounded-xl px-5 py-10 bg-white'>

                    {/*tab header*/}
                    <div className='pb-[20px] border-b border-slate-300'>
                        <div className="grid grid-cols-2 w-fit items-center gap-x-1 gap-y-2 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
                            {tabGroups.map((tab) => (
                                <TabButton tab={tab} currTab={currTab} onClick={() => setCurrTab(tab)} />
                            ))}
                        </div>
                    </div>

                    <div className='pt-[20px] overflow-x-auto'>
                        {isLoading ? (
                            <TableSkeleton columns={5} rows={5} />
                        ) : (
                            renderTabContent()
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientDetailsPage;