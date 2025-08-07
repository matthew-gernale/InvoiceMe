import type { DecodedRefreshToken } from '../@types/auth.type';

export const decodeRefreshToken = (token: string): DecodedRefreshToken | null => {
    try {
        const base64Token = token.split('.')[1];
        if (!base64Token) return null;

        const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');

        const jsonPayload = atob(padded);
        const decoded = JSON.parse(jsonPayload);

        const nameid = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        const name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (!nameid || !email || !role || !name) return null;

        return {
            nameid,
            email,
            role,
            exp: decoded.exp,
            name
        };
    } catch {
        return null;
    }
};

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

export function getGreetings() {
    const currTime = new Date();
    const currHour = currTime.getHours();

    let greetings = '';

    if (currHour >= 0 && currHour < 12) greetings = 'Good Morning';
    else if (currHour >= 12 && currHour < 18) greetings = 'Good Afternoon';
    else greetings = 'Good Evening';

    return greetings;
}