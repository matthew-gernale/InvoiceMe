import { GetBranchOrderDTO } from "../../../@types/branchorder.type";
import { ScrollText, ClipboardCheck, CreditCard, Archive, Truck } from "lucide-react";
import dayjs from 'dayjs';

interface HeaderProps {
    branchOrder: GetBranchOrderDTO;
}

function BOTimeline({ branchOrder }: HeaderProps) {
    return (
        <>
            <div className="flex gap-x-3">
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                    <div className="relative z-10 size-7 flex justify-center items-center bg-gray-200 rounded-[50%] h-[40px] w-[40px] text-gray-500">
                        <Truck />
                    </div>
                </div>

                <div className="grow pt-0.5 pb-8">
                    <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                        READY FOR PICKUP
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                        ETA:
                    </p>
                    <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        {branchOrder.PickupETA ? dayjs(branchOrder.PickupETA).format('MMMM D, YYYY') : "PENDING"}
                    </button>
                </div>
            </div>

            <div className="flex gap-x-3">
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                    <div className="relative z-10 size-7 flex justify-center items-center bg-gray-200 rounded-[50%] h-[40px] w-[40px] text-gray-500">
                        <Archive />
                    </div>
                </div>

                <div className="grow pt-0.5 pb-8">
                    <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                        PREPARING ORDER
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                        UPDATED AT:
                    </p>
                    <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        {branchOrder.PreparingDate ? dayjs(branchOrder.PreparingDate).format('MMMM D, YYYY') : "PENDING"}
                    </button>
                </div>
            </div>

            <div className="flex gap-x-3">
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                    <div className="relative z-10 size-7 flex justify-center items-center bg-gray-200 rounded-[50%] h-[40px] w-[40px] text-gray-500">
                        <CreditCard />
                    </div>
                </div>

                <div className="grow pt-0.5 pb-8">
                    <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                        PAYMENT
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                        APRPROVAL AT:
                    </p>
                    <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        {branchOrder.PaymentApprovalDate ? dayjs(branchOrder.PaymentApprovalDate).format('MMMM D, YYYY') : "PENDING"}
                    </button>
                </div>
            </div>

            <div className="flex gap-x-3">
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                    <div className="relative z-10 size-7 flex justify-center items-center bg-gray-200 rounded-[50%] h-[40px] w-[40px] text-gray-500">
                        <ClipboardCheck />
                    </div>
                </div>

                <div className="grow pt-0.5 pb-8">
                    <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                        ORDER ACCEPTED
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                        APPROVAL AT:
                    </p>
                    <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        {branchOrder.ApprovalDate ? dayjs(branchOrder.ApprovalDate).format('MMMM D, YYYY') : "PENDING"}
                    </button>
                </div>
            </div>

            <div className="flex gap-x-3">
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                    <div className="relative z-10 size-7 flex justify-center items-center bg-gray-200 rounded-[50%] h-[40px] w-[40px] text-gray-500">
                        <ScrollText />
                    </div>
                </div>

                <div className="grow pt-0.5 pb-8">
                    <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                        ORDER PLACED
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                        CREATED AT:
                    </p>
                    <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        {dayjs(branchOrder.DateCreated).format('MMMM d, YYYY')}
                    </button>
                </div>
            </div>
        </>
    );
}

export default BOTimeline;