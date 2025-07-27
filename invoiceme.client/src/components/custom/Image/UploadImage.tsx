import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadImageProps {
    onFilesSelected: (files: File[]) => void;
    title: string;
    existingUrls: string[] | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const UploadImage: React.FC<UploadImageProps> = ({ onFilesSelected, title, existingUrls }) => {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    useEffect(() => {
        if (existingUrls && existingUrls.length > 0) {
            setPreviewUrls(existingUrls);
        }
    }, [existingUrls]);

    const onDrop = (acceptedFiles: File[]) => {
        const validFiles: File[] = [];
        const rejectedMessages: string[] = [];

        acceptedFiles.forEach((file) => {
            if (!ACCEPTED_TYPES.includes(file.type)) {
                rejectedMessages.push(`File type not allowed: ${file.type}`);
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                rejectedMessages.push(`File too large: ${file.name}`);
                return;
            }

            validFiles.push(file);
        });

        if (rejectedMessages.length > 0) {
            rejectedMessages.forEach((msg) => alert(msg));
        }

        const urls = validFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls(urls);
        onFilesSelected(validFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': [],
        },
        multiple: true,
    });

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            previewUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 dark:border-gray-500 bg-[#F6F7FF] dark:bg-gray-900 dark:text-white/50 p-6 rounded-lg text-center cursor-pointer relative"
        >
            <input {...getInputProps()} className="absolute w-full h-full opacity-0 z-20 cursor-pointer" />

            {previewUrls.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto max-w-full py-2">
                    {previewUrls.map((url, idx) => (
                        <img
                            key={idx}
                            src={url}
                            alt={`Preview ${idx}`}
                            className="h-24 w-auto rounded border border-gray-300"
                        />
                    ))}
                </div>
            ) : (
                <>
                    <div className="mb-[5px] flex justify-center ">
                        <div className="flex h-[68px] w-[68px] items-center justify-center">
                                <svg
                                    className="fill-current"
                                    width="50"
                                    height="58"
                                    viewBox="0 0 29 28"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                                    />
                                </svg>
                        </div>
                    </div>
                    <div className="z-10 relative">
                            <p className="font-medium text-sm text-gray-500 dark:text-gray-400">
                            Click to upload <strong>{title}</strong> images here.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default UploadImage;
