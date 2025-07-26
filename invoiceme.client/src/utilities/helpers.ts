

export const stringIsNullOrEmpty = (value?: string | null): boolean => {
    return !value || value.trim() === '';
}


export const convertToPHP = (value: number) => {
    const formatted = value.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
    });

    return formatted.replace('₱', '₱ ');
};


export function normalizeToTimeSpanFormat(value: string): string {
    return value.length === 5 ? `${value}:00` : value;
}

export function formatTo12Hour(timeStr: string | null): string {
    if (timeStr === null || timeStr === '') return "";

    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}
export function formatTo24HourFormat(timeStr: string): string {
    if (!timeStr) return "";

    const date = new Date(`1970-01-01 ${timeStr}`);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}:00`;
}


export function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};