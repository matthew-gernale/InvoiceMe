import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { CalenderIcon } from "../../icons";

type PropsType = {
    id: string;
    mode?: "single" | "multiple" | "range" | "time";
    value?: Date | null;
    onChange?: (value: Date | null) => void;
    defaultDate?: Date;
    label?: string;
    placeholder?: string;
    className?: string;
};

export default function DatePicker({
    id,
    mode = "single",
    value,
    onChange,
    defaultDate,
    label,
    placeholder,
    className = "",
}: PropsType) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;

        const instance = flatpickr(inputRef.current, {
            mode,
            position: "above",
            static: true,
            monthSelectorType: "static",
            dateFormat: "M d, Y",
            defaultDate: value || defaultDate,
            onChange: (selectedDates) => {
                onChange?.(new Date(selectedDates[0].setHours(12, 0, 0, 0)));
            },
        });

        return () => {
            instance.destroy();
        };
    }, [mode, onChange, value, defaultDate]);

    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}

            <div className="relative">
                <input
                    ref={inputRef}
                    id={id}
                    defaultValue={value ? value.toISOString().split("T")[0] : ""}
                    placeholder={placeholder}
                    className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 dark:focus:border-brand-800 ${className}`}
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <CalenderIcon className="size-6" />
                </span>
            </div>
        </div>
    );
}
