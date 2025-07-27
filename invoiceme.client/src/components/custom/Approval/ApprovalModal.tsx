import React from 'react';
import { Modal } from "../../ui/modal";

interface ApprovalModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
    onClose: (success: boolean) => void;
    submitBtnClass?: string;
    submitBtn?: string;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({
    isOpen,
    title = 'Approve Action',
    description = 'Are you sure you want to approve this action?',
    onClose,
    submitBtnClass,
    submitBtn
}) => {

    const handleClose = (status: boolean) => {
        onClose(status);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => handleClose(false)} 
            className="max-w-md p-4 lg:p-5 m-4"
        >
            <div className="bg-white p-6 rounded-lg">
                <div className="px-2">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {title}
                    </h4>
                    <p className="text-[13px] font-normal text-[#8a9499] tracking-[0.5px] mt-8">
                        {description}
                    </p>
                    <div className="flex justify-end gap-3 mt-10 text-center">
                        <button
                            onClick={() => handleClose(false)}
                            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
                            Cancel
                        </button>
                        <button
                            onClick={() => handleClose(true)}
                            className={`${submitBtnClass} flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:bg-gray-300 disabled:text-gray-500 sm:w-auto`}>
                            { submitBtn && submitBtn !== '' ? submitBtn : 'Submit' }
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ApprovalModal;