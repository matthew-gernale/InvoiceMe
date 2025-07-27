import { useState, useEffect } from 'react'

import invoiceService from '../../services/invoiceService'
import { GetPaginatedDTO, PaginatedCountsResponse } from '../../@types/response.type'
import { InvoiceDTO } from '../../@types/invoice.type'
import { InvoiceStatus } from '../../enums/enum'

import { convertToPHP, formatDate } from '../../utilities/helpers'

import PageMeta from "../../components/common/PageMeta"
import PageBreadCrumb from '../../components/common/PageBreadCrumb'
import PaginatedTable from '../../components/tables/PaginatedTable'
import IconButton from '../../components/ui/button/IconButton'
import TableSkeleton from '../../components/skeleton/TableSkeleton'
import { Eye, List, FileClock, ClipboardCheck, ClipboardX } from 'lucide-react'
import InvoiceStatusBadge from '../../components/ui/badge/InvoiceStatusBadge'
import CardCount from "../../components/cards/CardCount"
import AddInvoiceModal from "./AddInvoiceModal"
import SingleInvoiceModal from "./SingleInvoiceModal"

function AllInvoicePage() {

    const [payload, setPayload] = useState<GetPaginatedDTO>(new GetPaginatedDTO());
    const [dbInvoices, setDbInvoices] = useState<InvoiceDTO[] | null>();
    const [totalItems, setTotalItems] = useState(0);
    const [statusCount, setStatusCount] = useState<PaginatedCountsResponse>(new PaginatedCountsResponse());

    const [isLoading, setIsLoading] = useState(false);
    const [isTableLoading, setIsTableLoading] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startIndex = (currPage - 1) * rowsPerPage;
    const endIndex = Math.min(currPage + rowsPerPage, totalItems);

    const [isShowAddInvoice, showAddInvoice] = useState(false);
    const [isShowInvoiceDetails, showInvoiceDetails] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDTO>(new InvoiceDTO());

    const getInvoicePaginated = async () => {
        const response = await invoiceService.getInvoicesPaginated(payload);
        setDbInvoices(response?.ResponseData);
        setTotalItems(response?.Count ?? 0);
    }

    const searchInvoice = async (searchValue: string) => {
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

    const handleApplyFilter = async (status: InvoiceStatus | null) => {
        setIsTableLoading(true);
        const statusChangePayload = new GetPaginatedDTO();
        statusChangePayload.InvoiceStatus = status;
        statusChangePayload.Take = rowsPerPage;

        setPayload(statusChangePayload);
        setIsTableLoading(false);
    }

    const getInvoiceCountByStatus = async () => {
        const response = await invoiceService.getInvoiceCountsByStatus();
        setStatusCount(response ?? new PaginatedCountsResponse());
    }

    const handleAddInvoiceResult = (isSuccess: boolean) => {
        if (isSuccess) {
            setIsTableLoading(true);
            getInvoicePaginated();
            getInvoiceCountByStatus();
            setIsTableLoading(false);
        }

        showAddInvoice(false);
    }

    const showInvoiceDetailsModal = (invoice: InvoiceDTO) => {
        setSelectedInvoice(invoice);
        showInvoiceDetails(true);
    }

    const handleInvoiceUpdateResult = (isSuccess: boolean, status?: InvoiceStatus) => {
        if (isSuccess) selectedInvoice.Status = status ?? InvoiceStatus.TO_BE_PAID;

        showInvoiceDetails(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await getInvoiceCountByStatus();
            await getInvoicePaginated();
            setIsLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (isTableLoading) return;
        getInvoicePaginated();
    }, [payload]);

    return (
        <>
            <PageMeta
                title="InvoiceMe | Invoice"
                description="This page shows client invoice"
            />

            <PageBreadCrumb
                currentPage='Invoice'
                previousPage='Dashboard'
                previousPageIcon={null}
                previousPageLink='/'
                pageTitle='ALL CLIENT INVOICE'
                buttonName='Add invoice'
                btnClass='primary-btn max-w-[200px]'
                onBtnclick={() => showAddInvoice(true)}
            />

            <AddInvoiceModal isOpen={isShowAddInvoice} onClose={handleAddInvoiceResult} />
            <SingleInvoiceModal isOpen={isShowInvoiceDetails} onClose={handleInvoiceUpdateResult} selectedInvoice={selectedInvoice} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mb-5">
                <div>
                    <CardCount
                        Icon={List}
                        Title="ALL"
                        Count={statusCount.AllCount}
                        OnClick={() => handleApplyFilter(null)}
                        CardClassName='all-count-card'
                    />
                </div>
                <div>
                    <CardCount
                        Icon={FileClock}
                        Title="TO BE PAID"
                        Count={statusCount.ToBePaidCount}
                        OnClick={() => handleApplyFilter(InvoiceStatus.TO_BE_PAID)}
                        CardClassName='pending-count-card'
                    />
                </div>
                <div>
                    <CardCount
                        Icon={ClipboardCheck}
                        Title="CANCELLED"
                        Count={statusCount.CancelledCount}
                        OnClick={() => handleApplyFilter(InvoiceStatus.CANCELLED)}
                        CardClassName='done-count-card'
                    />
                </div>
                <div>
                    <CardCount
                        Icon={ClipboardX}
                        Title="OVERDUE"
                        Count={statusCount.OverdueCount}
                        OnClick={() => handleApplyFilter(InvoiceStatus.OVERDUE)}
                        CardClassName='rejected-count-card'
                    />
                </div>
                <div>
                    <CardCount
                        Icon={ClipboardX}
                        Title="PAID"
                        Count={statusCount.PaidCount}
                        OnClick={() => handleApplyFilter(InvoiceStatus.PAID)}
                        CardClassName='approved-count-card'
                    />
                </div>
            </div>

            {
                isLoading === true
                    ? (
                        <TableSkeleton columns={8} rows={10} />
                    ) : (
                        <PaginatedTable
                            currentPage={currPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleRowsPerPageChanged}
                            totalEntries={totalItems}
                            startIndex={startIndex}
                            onSearchValueChange={searchInvoice}
                            endIndex={endIndex}
                            colspan={8}
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
                                            Invoice #
                                        </p>
                                    </th>
                                    <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                        <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                                            Client
                                        </p>
                                    </th>
                                    <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                        <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                                            Invoice Date
                                        </p>
                                    </th>
                                    <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                        <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                                            Status
                                        </p>
                                    </th>
                                    <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                        <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                                            IsOverDue
                                        </p>
                                    </th>
                                    <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                        <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                                            Total
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
                                    dbInvoices?.map((item, index) => (
                                        <tr key={item.Id ?? `row-${index}`}>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                                    {item.Id}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                                    {item.InvoiceNo}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                                    {item.ClientName}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                                    {formatDate(item.InvoiceDate)}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                                    <InvoiceStatusBadge status={item.Status} />
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                {
                                                    item.IsOverDue &&
                                                    <div className='w-full flex items-center justify-center'>
                                                            <p className='text-center block bg-red-100 text-red-600 px-[10px] w-fit text-[10px] rounded-full'>OVERDUE</p>
                                                    </div>
                                                }
                                            </td>
                                            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                                <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                                    {convertToPHP(item.Total)}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 border text-center dark:border-white/[0.05]">
                                                <IconButton
                                                    className='view-icon-btn'
                                                    tooltip='View invoice'
                                                    icon={<Eye />}
                                                    onClick={() => showInvoiceDetailsModal(item)}
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

export default AllInvoicePage;