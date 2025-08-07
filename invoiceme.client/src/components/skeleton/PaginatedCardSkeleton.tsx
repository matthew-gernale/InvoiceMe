

class PaginatedCardSkeleton {
    // Skeleton Card Component
    SkeletonCard = ({ description = true, imgClass = '', btnClass = '' }) => (
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className={`w-full h-[200px] bg-gray-300 ${imgClass}`}></div>

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
                {/* Title skeleton */}
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>

                {/* Description skeleton - multiple lines */}
                {
                    description === true &&
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                }

                {/* Button skeleton */}
                <div className={``}>
                    <div className={`h-10 bg-gray-300 rounded w-32 ${btnClass}`}></div>
                </div>
            </div>
        </div>
    );

    // Skeleton Grid Component
    SkeletonGrid = ({ count = 6, description = true, imgClass = '', btnClass = '' }) => (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
            {Array.from({ length: count }).map((_, index) => (
                <this.SkeletonCard key={index} description={description} imgClass={imgClass} btnClass={btnClass} />
            ))}
        </div>
    );

    // Skeleton for PaginatedCard header
    SkeletonHeader = () => (
        <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Search skeleton */}
                <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>

                {/* Items per page skeleton */}
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
        </div>
    );

    // Skeleton for pagination
    SkeletonPagination = () => (
        <div className="flex justify-center items-center space-x-2 mt-6">
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
    );
}



export const paginatedCardSkeleton = new PaginatedCardSkeleton();