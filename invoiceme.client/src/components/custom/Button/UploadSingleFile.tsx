import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { IoCloseOutline } from "react-icons/io5";
interface UploadFileProps {
    onFileSelected: (file: File | null) => void;
    title?: string;
    existingUrl?: string | null;
    maxSize?: number;
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_TITLE = 'Click to upload file here';

const UploadFile: React.FC<UploadFileProps> = ({
    onFileSelected,
    title = DEFAULT_TITLE,
    existingUrl,
    maxSize = DEFAULT_MAX_SIZE
}) => {
    const [preview, setPreview] = useState<{
        url: string | null;
        name: string;
        type: string;
        isImage: boolean;
    }>({
        url: null,
        name: '',
        type: '',
        isImage: false
    });

    useEffect(() => {
        if (existingUrl) {
            const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(existingUrl);
            setPreview({
                url: existingUrl,
                name: existingUrl.split('/').pop() || 'Uploaded file',
                type: isImage ? 'image/*' : 'application/octet-stream',
                isImage
            });
        }
    }, [existingUrl]);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];

        if (file.size > maxSize) {
            toast.warn(`File too large: Maximum size is ${maxSize / (1024 * 1024)}MB`);
            return;
        }

        if (preview.url && preview.url.startsWith('blob:')) {
            URL.revokeObjectURL(preview.url);
        }

        const isImage = file.type.startsWith('image/');
        const previewUrl = isImage ? URL.createObjectURL(file) : 'non-image';

        setPreview({
            url: previewUrl,
            name: file.name,
            type: file.type,
            isImage
        });

        onFileSelected(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
    });

    useEffect(() => {
        return () => {
            if (preview.url && preview.url.startsWith('blob:')) {
                URL.revokeObjectURL(preview.url);
            }
        };
    }, [preview.url]);

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (preview.url && preview.url.startsWith('blob:')) {
            URL.revokeObjectURL(preview.url);
        }
        setPreview({
            url: null,
            name: '',
            type: '',
            isImage: false
        });
        onFileSelected(null);
    };

    const getFileIcon = (type: string) => {
        if (type.includes('pdf')) {
            return <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>;
        }

        if (type.includes('word') || type.includes('document')) {
            return <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>;
        }

        if (type.includes('excel') || type.includes('spreadsheet') || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || type === 'application/vnd.ms-excel') {
            return <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>;
        }

        // Default file icon
        return <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>;
    };

    return (
        <div
            {...getRootProps()}
            className="cursor-pointer p-8 flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200"
        >
            <input {...getInputProps()} className="hidden" />

            {preview.url || preview.name ? (
                <div className="relative w-full flex flex-col items-center">
                    {preview.isImage && preview.url !== 'non-image' ? (
                        <img
                            src={preview.url!}
                            alt="Preview"
                            className="h-32 w-auto object-contain rounded border border-gray-200"
                        />
                    ) : (
                        <div className="flex flex-col items-center">
                            {getFileIcon(preview.type)}
                            <span className="mt-2 text-sm font-medium text-gray-700 truncate max-w-xs">
                                {preview.name}
                            </span>
                        </div>
                    )}
                    <button
                        onClick={removeFile}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 z-30"
                        type="button"
                    >
                        <IoCloseOutline />
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 text-gray-400">
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center text-sm text-gray-600">
                        <span className="font-medium text-gray-800">
                            {title}
                        </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                        Max file size: {maxSize / (1024 * 1024)}MB
                    </p>
                </div>
            )}
        </div>
    );
};

export default UploadFile;
