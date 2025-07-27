import { useState, useEffect } from "react";
import TextArea from "../../form/input/TextArea";
import { Modal } from "../../ui/modal";

interface rejectReturn {
    success: boolean;
    description: string;
};

type HeaderProps = {
    isOpen: boolean;
    title: string;
    descriptionText?: string | null;
    handleClose: ({ success, description }: rejectReturn) => void;
    submitBtn?: string;
    submitBtnClass?: string;
};

function RejectModal({ title = "", descriptionText, isOpen, handleClose, submitBtn, submitBtnClass }: HeaderProps) {

    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        if (!isOpen) return;

        setRejectReason("");
    }, [isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => handleClose({ success: false, description: '' })}
            className="max-w-md p-4 lg:p-5 m-4"
        >
            <div className="bg-white p-6 rounded-lg">
                <div className="px-2">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {title}
                    </h4>
                    <div className="mt-5">
                        <div className="relative">
                            <TextArea
                                rows={5}
                                placeholder={`${(descriptionText ? descriptionText : 'Enter reject reason here...')}`}
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-5 text-center">
                        <button
                            onClick={() => handleClose({ success: false, description: '' })}
                            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
                            Cancel
                        </button>
                        <button
                            onClick={() => handleClose({ success: true, description: rejectReason })}
                            className={`${submitBtnClass} flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:bg-gray-300 disabled:text-gray-500 sm:w-auto`}>
                            { submitBtn && submitBtn !== '' ? submitBtn : 'Reject' }
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default RejectModal;