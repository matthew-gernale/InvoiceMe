import React from 'react';

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="w-full animate-pulse">
            <table className="w-full border-collapse table-auto">
                <thead>
                    <tr>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <th key={colIndex} className="px-4 py-2 bg-gray-100 dark:bg-gray-800">
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-gray-200 dark:border-gray-700">
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <td key={colIndex} className="px-4 py-3">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;
