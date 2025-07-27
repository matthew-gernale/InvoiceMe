import React from 'react';

import PaginationWithIcon from "../../../components/tables/DataTables/TableOne/PaginationWithIcon";

interface DialogTableProps {
    children: React.ReactNode;
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    totalEntries: number;
    startIndex: number;
    endIndex: number;
    onPageChange: (page: number) => void;
    colspan: number;
    tableLoading?: boolean;
}

export default function DialogTable({
    children,
    currentPage,
    totalPages,
    totalEntries,
    startIndex,
    endIndex,
    onPageChange,
    colspan,
    tableLoading = false
}: DialogTableProps) {

    let headerChildren: React.ReactNode = null;
    let bodyChildren: React.ReactNode = null;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        if (child.type === "thead") {
            headerChildren = child;
        } else if (child.type === "tbody") {
            bodyChildren = child;
        }
    });

    return (
        <div className="overflow-hidden  rounded-xl  bg-white  dark:bg-white/[0.03]">

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-white/[0.05]">
                    {headerChildren}
                    {tableLoading ? (
                        <tbody>
                            {Array.from({ length: 2 }).map((_, idx) => (
                                <SkeletonRow key={idx} cols={colspan} />
                            ))}
                        </tbody>
                    ) : totalEntries === 0 ? (
                        <tbody>
                            <tr>
                                <td colSpan={colspan} className="px-4 py-4 text-center text-gray-500 dark:text-white/70">
                                    NO RESULTS FOUND
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        bodyChildren
                    )}
                </table>
            </div>
            <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                    <div className="pb-3 xl:pb-0">
                        <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                            Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
                        </p>
                    </div>
                    <PaginationWithIcon
                        initialPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    );
}

const SkeletonRow = ({ cols }: { cols: number }) => (
    <tr>
        {Array.from({ length: cols }).map((_, idx) => (
            <td key={idx} className="px-4 py-4">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </td>
        ))}
    </tr>
);
