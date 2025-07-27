import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import snackbarInstance from "../../../utilities/snackbarInstance";
import { CheckCircleIcon, InfoIcon, AlertHexaIcon, ErrorHexaIcon, CloseIcon } from "../../../icons";

type Variant = "success" | "info" | "warning" | "error";

type SnackBarData = {
    title: string;
    description?: string;
    variant: Variant;
    hideDuration?: number;
};

const ModifiedSnackBar = () => {
    const [notification, setNotification] = useState<SnackBarData | null>(null);

    useEffect(() => {
        snackbarInstance.setHandler((data: SnackBarData) => {
            setNotification(data);
            setTimeout(() => setNotification(null), data.hideDuration ?? 3000);
        });
    }, []);

    const handleClose = () => {
        setNotification(null);
    };

    if (!notification) return null;

    const {
        title,
        description,
        variant = "info", // default fallback
    } = notification;

    const variantStyles = {
        success: {
            borderColor: "border-success-500",
            iconBg: "bg-success-50 text-success-500",
            icon: <CheckCircleIcon />,
        },
        info: {
            borderColor: "border-blue-light-500",
            iconBg: "bg-blue-light-50 text-blue-light-500",
            icon: <InfoIcon />,
        },
        warning: {
            borderColor: "border-warning-500",
            iconBg: "bg-warning-50 text-warning-500",
            icon: <AlertHexaIcon />,
        },
        error: {
            borderColor: "border-error-500",
            iconBg: "bg-error-50 text-error-500",
            icon: <ErrorHexaIcon className="size-5" />,
        },
    };

    const { borderColor, iconBg, icon } = variantStyles[variant];

    return createPortal(
        <div className="fixed bottom-5 right-5 z-[99999]">
            <div
                className={`flex items-center justify-between gap-3 w-full sm:max-w-[340px] rounded-md border-b-4 p-3 shadow-theme-sm bg-white dark:bg-[#1E2634] ${borderColor}`}
            >
                <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconBg}`}>
                        {icon}
                    </div>

                    {/* Title and Description */}
                    <div>
                        <h4 className="text-sm text-gray-800 sm:text-base dark:text-white/90">
                            {title}
                        </h4>
                        {description && (
                            <p className="mt-1 text-xs text-gray-600 sm:text-sm dark:text-white/70">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-800 dark:hover:text-white/90"
                >
                    <CloseIcon />
                </button>
            </div>
        </div>,
        document.body
    );
};

export default ModifiedSnackBar;
