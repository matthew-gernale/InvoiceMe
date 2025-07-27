import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import clientService from '../../services/clientService'
import { GetPaginatedDTO } from '../../@types/response.type'
import { ClientDTO } from '../../@types/client.type'

import PageMeta from "../../components/common/PageMeta"
import PageBreadCrumb from '../../components/common/PageBreadCrumb'
import PaginatedTable from '../../components/tables/PaginatedTable'
import IconButton from '../../components/ui/button/IconButton'
import TableSkeleton from '../../components/skeleton/TableSkeleton'
import { Eye, RotateCcw } from 'lucide-react'
import ApprovalModal from '../../components/custom/Approval/ApprovalModal'


function AllDeletedClientsPage() {
    const navigate = useNavigate();

    const [payload, setPayload] = useState<GetPaginatedDTO>(new GetPaginatedDTO({ IsSoftDeleted: true }));
    const [dbClients, setDbClients] = useState<ClientDTO[]>([]);
    const [totalItems, setTotalItems] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [isTableLoading, setIsTableLoading] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startIndex = (currPage - 1) * rowsPerPage;
    const endIndex = Math.min(currPage + rowsPerPage, totalItems);

    const [isShowApprovalModal, showApprovalModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientDTO>(new ClientDTO());

    const getClientsPaginated = async () => {
        const response = await clientService.getClientsPaginated(payload);
        setDbClients(response?.ResponseData ?? []);
        setTotalItems(response?.Count ?? 0);
    }

    const searchClient = async (searchValue: string) => {
        setIsTableLoading(true);
        const searchPayload = new GetPaginatedDTO();
        searchPayload.SearchValue = searchValue;
        searchPayload.Take = rowsPerPage;

        setPayload(searchPayload);
        setIsTableLoading(false);
    }

    const handleRowsPerPageChanged = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsTableLoading(true);
        const rowChangedPayload = new GetPaginatedDTO();
        rowChangedPayload.Take = parseInt(e.target.value);
        rowChangedPayload.Skip = 0;

        setRowsPerPage(rowChangedPayload.Take);
        setPayload(rowChangedPayload);
        setIsTableLoading(false);
    }

    const handlePageChange = async (page: number) => {
        setIsTableLoading(true);
        const pageChangedPayload = new GetPaginatedDTO();
        pageChangedPayload.Take = payload.Take;
        pageChangedPayload.Skip = (page - 1) * payload.Take;

        setPayload(pageChangedPayload);
        setCurrPage(page);
        setIsTableLoading(false);
    }

    const recoverClient = async () => {
        const response = await clientService.updateClientActiveStatus(selectedClient.Id, true);
        if (response) setDbClients(prev => prev?.filter(client => client.Id !== selectedClient.Id));
    }

    const handleApproval = (confirmed: boolean) => {
        if (confirmed) recoverClient();
        showApprovalModal(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await getClientsPaginated();
            setIsLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (isTableLoading) return;
        getClientsPaginated();
    }, [payload]);

    return (
        <>
            <PageMeta
                title="InvoiceMe | Recover Clients"
                description="This page shows deleted clients"
            />

            <PageBreadCrumb
                currentPage='Recover clients'
                previousPage='Manage'
                previousPageIcon={null}
                previousPageLink='/clients'
                pageTitle='ALL DELETED CLIENTS'
            />

            <ApprovalModal
                isOpen={isShowApprovalModal}
                onClose={handleApproval}
                title='Recover confirmation'
                description={`Are you sure you want to recover ${selectedClient.Name} in your client list?`}
                submitBtnClass=''
                submitBtn='Confirm'
            />

            {
                isLoading === true
                    ? (
                        <TableSkeleton columns={5} rows={10} />
                    ) : (
                        <PaginatedTable
                            currentPage={currPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleRowsPerPageChanged}
                            totalEntries={totalItems}
                            startIndex={startIndex}
                            onSearchValueChange={searchClient}
                            endIndex={endIndex}
                            colspan={5}
                            tableLoading={isTableLoading}>
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                        <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                                            Id
                                        </p>
                                    </th >
                                    <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                        <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                                            Client
                                        </p>
                                    </th>
                                    <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                        <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                                            Contact
                                        </p>
                                    </th>
                                    <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                        <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                                            Email
                                        </p>
                                    </th>
                                    <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                        <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                                            Action
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dbClients?.map((item, index) => (
                                        <tr key={item.Id ?? `row-${index}`}>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                                    {item.Id}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                                    {item.Name}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                                    {item.Contact}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                                    {item.Email}
                                                </p>
                                            </td>
                                            <td className="flex justify-center gap-[15px] px-4 py-4 border dark:border-white/[0.05]">
                                                <IconButton
                                                    className='view-icon-btn'
                                                    tooltip='View client'
                                                    icon={<Eye />}
                                                    onClick={() => navigate(`/clients/${item.Id}`)}
                                                />

                                                <IconButton
                                                    className='payment-icon-btn'
                                                    tooltip='Recover client'
                                                    icon={<RotateCcw />}
                                                    onClick={() => {
                                                        setSelectedClient(item);
                                                        showApprovalModal(true);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </PaginatedTable>
                    )
            }
        </>
    );
}

export default AllDeletedClientsPage;