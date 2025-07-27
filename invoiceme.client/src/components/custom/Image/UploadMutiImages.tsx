import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

interface UploadedFile {
    id: string;
    file: File;
    preview: string;
    progress: number;
    uploaded: boolean;
}

interface UploadMutiImageProps {
    onFilesSelected: (files: File[]) => void;
    existingUrls: string[] | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const UploadMutiImages = ({ existingUrls, onFilesSelected }: UploadMutiImageProps) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);



    useEffect(() => {
        if (existingUrls && existingUrls.length > 0) {
            setPreviewUrls(existingUrls);
        }
    }, [existingUrls]);

    const processFiles = useCallback((fileList: FileList) => {
        const newFiles: UploadedFile[] = [];
        const validFiles: File[] = [];
        const rejectedMessages: string[] = [];

        Array.from(fileList).forEach((file) => {
            if (!ACCEPTED_TYPES.includes(file.type)) {
                rejectedMessages.push(`File type not allowed: ${file.type}`);
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                rejectedMessages.push(`File too large: ${file.name}`);
                return;
            }

            if (file.type.startsWith('image/')) {
                const id = Math.random().toString(36).substr(2, 9);
                const preview = URL.createObjectURL(file);

                newFiles.push({
                    id,
                    file,
                    preview,
                    progress: 0,
                    uploaded: false
                });
                validFiles.push(file);
            }
        });

        if (rejectedMessages.length > 0) {
            rejectedMessages.forEach((msg) => toast.error(`${msg}`));
        }

        setFiles(prev => [...prev, ...newFiles]);
        onFilesSelected(validFiles);
        // Simulate upload progress
        newFiles.forEach((uploadFile) => {
            simulateUpload(uploadFile.id);
        });
    }, [onFilesSelected]);



    const simulateUpload = (fileId: string) => {
        const interval = setInterval(() => {
            setFiles(prev => prev.map(file => {
                if (file.id === fileId) {
                    const newProgress = Math.min(file.progress + Math.random() * 30, 100);
                    return {
                        ...file,
                        progress: newProgress,
                        uploaded: newProgress >= 100
                    };
                }
                return file;
            }));
        }, 200);

        setTimeout(() => {
            clearInterval(interval);
            setFiles(prev => prev.map(file =>
                file.id === fileId ? { ...file, progress: 100, uploaded: true } : file
            ));
        }, 1500 + Math.random() * 1000);
    };

    const removeFile = (fileId: string) => {
        setFiles(prev => {
            const fileToRemove = prev.find(f => f.id === fileId);
            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            return prev.filter(f => f.id !== fileId);
        });
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    }, [processFiles]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(e.target.files);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white">
            <ToastContainer />
            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center space-y-3">
                    <div className="text-center">
                        <span className="inline-flex justify-center items-center size-16">
                            <svg
                                className="shrink-0 w-16 h-auto"
                                width={71}
                                height={51}
                                viewBox="0 0 71 51"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.55172 8.74547L17.7131 6.88524V40.7377L12.8018 41.7717C9.51306 42.464 6.29705 40.3203 5.67081 37.0184L1.64319 15.7818C1.01599 12.4748 3.23148 9.29884 6.55172 8.74547Z"
                                    stroke="#2563EB"
                                    strokeWidth={2}
                                />
                                <path
                                    d="M64.4483 8.74547L53.2869 6.88524V40.7377L58.1982 41.7717C61.4869 42.464 64.703 40.3203 65.3292 37.0184L69.3568 15.7818C69.984 12.4748 67.7685 9.29884 64.4483 8.74547Z"
                                    stroke="#2563EB"
                                    strokeWidth={2}
                                />
                                <g filter="url(#filter1)">
                                    <rect
                                        x="17.5656"
                                        y={1}
                                        width="35.8689"
                                        height="42.7541"
                                        rx={5}
                                        stroke="#2563EB"
                                        strokeWidth={2}
                                        shapeRendering="crispEdges"
                                    />
                                </g>
                                <path
                                    d="M39.4826 33.0893C40.2331 33.9529 41.5385 34.0028 42.3537 33.2426L42.5099 33.0796L47.7453 26.976L53.4347 33.0981V38.7544C53.4346 41.5156 51.1959 43.7542 48.4347 43.7544H22.5656C19.8043 43.7544 17.5657 41.5157 17.5656 38.7544V35.2934L29.9728 22.145L39.4826 33.0893Z"
                                    className="fill-blue-50 dark:fill-blue-900/50"
                                    fill="currentColor"
                                    stroke="#2563EB"
                                    strokeWidth={2}
                                />
                                <circle
                                    cx="40.0902"
                                    cy="14.3443"
                                    r="4.16393"
                                    className="fill-blue-50 dark:fill-blue-900/50"
                                    fill="currentColor"
                                    stroke="#2563EB"
                                    strokeWidth={2}
                                />
                                <defs>
                                    <filter
                                        id="filter1"
                                        x="13.5656"
                                        y={0}
                                        width="43.8689"
                                        height="50.7541"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy={3} />
                                        <feGaussianBlur stdDeviation="1.5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                                        />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1" />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </span>
                        <div className="mt-4 flex flex-wrap justify-center text-sm/6 text-gray-600">
                            <span className="pe-1 font-medium text-gray-800 dark:text-neutral-200">
                                Drop your file here or
                            </span>
                            <span onClick={openFileDialog} className="cursor-pointer bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-hidden focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 dark:bg-neutral-800 dark:text-blue-500 dark:hover:text-blue-600">
                                browse
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-400 dark:text-neutral-400">
                            Pick a file up to 2MB.
                        </p>
                    </div>

                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {/* File Previews */}
            {files.length > 0 ? (
                <div className="overflow-x-auto w-full">
                    <div className="mt-5 flex gap-2">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="min-w-[120px] max-w-[120px] relative bg-white rounded-lg border border-gray-200 overflow-hidden "
                            >
                                {/* Image Preview */}
                                <div className="aspect-square  bg-gray-100 relative">

                                    <img
                                        src={file.preview}
                                        alt={file.file.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Progress Bar */}
                                <div className="p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            {Math.round(file.progress)}%
                                        </span>
                                        {file.uploaded && (
                                            <span className="text-xs text-green-600 font-medium">
                                                Uploaded
                                            </span>
                                        )}
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${file.uploaded ? 'bg-green-500' : 'bg-blue-500'
                                                }`}
                                            style={{ width: `${file.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 truncate">
                                        {file.file.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            ) : (
                <>
                    {previewUrls?.length > 0 && (
                        <>
                            <div className="overflow-x-auto w-full">
                                <div className="mt-5 flex gap-2">
                                    {previewUrls.map((images) => (
                                        <div
                                            key={images}
                                            className="min-w-[80px] max-w-[120px] relative bg-white rounded-lg border border-gray-200 overflow-hidden "
                                        >
                                            {/* Image Preview */}
                                            <div className="aspect-square  bg-gray-100 relative">

                                                <img
                                                    src={images}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}

            {/* Upload Summary */}
            {files.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            {files.length} file{files.length !== 1 ? 's' : ''} selected
                        </span>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                {files.filter(f => f.uploaded).length} of {files.length} uploaded
                            </span>
                            <button
                                onClick={() => setFiles([])}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadMutiImages;