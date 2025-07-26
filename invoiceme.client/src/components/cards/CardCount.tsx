interface HeaderProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    Title: string;
    Count: number;
    OnClick: () => void;
    CardClassName?: string;
}

function CardCount({ Icon, Title, Count, OnClick, CardClassName }: HeaderProps) {
    return (
        <div
            className={`${CardClassName} rounded-2xl p-5 dark:!border-gray-800 dark:!bg-white/[0.03] md:p-6 flex items-center justify-between xs:col-span-12 sm:col-span-6 md:col-span-3 cursor-pointer`}
            onClick={() => OnClick()}>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl dark:bg-gray-800">
                <Icon className="size-6 dark:text-white/90" />
            </div>

            <div className="flex flex-col gap-2 items-center">
                <span className="text-sm dark:text-gray-400">
                    {Title}
                </span>
                <h4 className="mt-2 font-bold text-title-sm dark:text-white/90">
                    {Count}
                </h4>
            </div>
        </div>
  );
}

export default CardCount;