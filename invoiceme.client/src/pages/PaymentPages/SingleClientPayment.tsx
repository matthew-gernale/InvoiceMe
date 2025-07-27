import { useState, useEffect } from 'react'

import paymentService from '../../services/paymentService'
import { GetPaginatedDTO, PaginatedCountsResponse } from '../../@types/response.type'
import { PaymentDTO } from '../../@types/payment.type'
import { ApprovalStatus } from '../../enums/enum'

import { convertToPHP, formatDate } from '../../utilities/helpers'

import PaginatedTable from '../../components/tables/PaginatedTable'
import IconButton from '../../components/ui/button/IconButton'
import { Eye } from 'lucide-react'
import ApprovalBadge from '../../components/ui/badge/ApprovalBadge'
import SinglePaymentModal from "./SinglePaymentModal"


export interface SingleClientPaymentProps {
    clientId: number
}

function SingleClientPayment(props: SingleClientPaymentProps) {


    const [payload, setPayload] = useState<GetPaginatedDTO>(new GetPaginatedDTO({ CustomerId: props.clientId }));
    const [dbPayments, setDbPayments] = useState<PaymentDTO[] | null>();
    const [totalItems, setTotalItems] = useState(0);

    const [isTableLoading, setIsTableLoading] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startIndex = (currPage - 1) * rowsPerPage;
    const endIndex = Math.min(currPage + rowsPerPage, totalItems);

    const [isShowPaymentetails, showPaymentDetails] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<PaymentDTO>(new PaymentDTO());

    const getPaymentsPaginated = async () => {
        const response = await paymentService.getPaymentsPaginated(payload);
        setDbPayments(response?.ResponseData);
        setTotalItems(response?.Count ?? 0);
    }

    const searchPayments = async (searchValue: string) => {
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

    const showPaymentDetailsModal = (payment: PaymentDTO) => {
        setSelectedPayment(payment);
        showPaymentDetails(true);
    }

    const handlePaymentUpdateResult = (isSuccess: boolean, status?: ApprovalStatus) => {
        if (isSuccess) selectedPayment.Status = status ?? ApprovalStatus.PENDING;

        showPaymentDetails(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsTableLoading(true);
            await getPaymentsPaginated();
            setIsTableLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (isTableLoading) return;
        getPaymentsPaginated();
    }, [payload]);

  return (
      <>
          <SinglePaymentModal isOpen={isShowPaymentetails} onClose={handlePaymentUpdateResult} payment={selectedPayment} />
          <PaginatedTable
              currentPage={currPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChanged}
              totalEntries={totalItems}
              startIndex={startIndex}
              onSearchValueChange={searchPayments}
              endIndex={endIndex}
              colspan={8}
              tableLoading={isTableLoading}>
              <thead>
                  <tr>
                      <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                          <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                              Id
                          </p>
                      </th>
                      <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                          <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                              Client
                          </p>
                      </th>
                      <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                          <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                              Amount
                          </p>
                      </th>
                      <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                          <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                              Status
                          </p>
                      </th>
                      <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                          <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                              Payment Date
                          </p>
                      </th>
                      <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                          <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                              Date Approved
                          </p>
                      </th>
                      <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                          <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-400">
                              Approved By
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
                      dbPayments?.map((item, index) => (
                          <tr key={item.Id ?? `row-${index}`}>
                              <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                  <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                      {item.Id}
                                  </p>
                              </td>
                              <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                  <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                      {item.Client}
                                  </p>
                              </td>
                              <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                  <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                      {convertToPHP(item.Amount)}
                                  </p>
                              </td>
                              <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                  <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                      <ApprovalBadge status={item.Status} />
                                  </p>
                              </td>
                              <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                  <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                      {formatDate(item.DateCreated)}
                                  </p>
                              </td>
                              <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                  <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                      {formatDate(item.ApprovalDate)}
                                  </p>
                              </td>
                              <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                  <p className="block font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                      {item.ApprovedByName}
                                  </p>
                              </td>
                              <td className="px-4 py-4 border text-center dark:border-white/[0.05]">
                                  <IconButton
                                      className='view-icon-btn'
                                      tooltip='View payment'
                                      icon={<Eye />}
                                      onClick={() => showPaymentDetailsModal(item)}
                                  />
                              </td>
                          </tr>
                      ))}
              </tbody>
          </PaginatedTable>
      </>
  );
}

export default SingleClientPayment;