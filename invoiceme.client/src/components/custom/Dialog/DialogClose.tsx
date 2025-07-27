type HeaderProps = {
    onClose: () => void;
};

function DialogClose({ onClose }: HeaderProps) {
    return (
        <>
            <div className="flex justify-end mt-5">
                <button
                    onClick={onClose}
                    className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
                    Close
                </button>
            </div>
        </>
    );
}

export default DialogClose;