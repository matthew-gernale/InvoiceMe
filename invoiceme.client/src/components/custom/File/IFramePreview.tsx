import React from "react";
import { Modal } from "../../../components/ui/modal";

interface HeaderProps {
    isOpen: boolean;
    onClose: () => void;
    iFrameURL: string;
}

const IFramePreview: React.FC<HeaderProps> = ({ isOpen, onClose, iFrameURL }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => onClose()}
            className="max-w-[650px] max-h-[800px] p-5"
        >
            <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(iFrameURL)}&embedded=true`}
                className="w-full h-[700px] border-0"
                title="PDF Preview"
            />
        </Modal>
    );
};

export default IFramePreview;