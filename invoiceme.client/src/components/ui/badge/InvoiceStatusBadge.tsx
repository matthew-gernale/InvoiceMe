
import Badge from '../badge/Badge'
import { InvoiceStatus } from '../../../enums/enum'
import { useState, useEffect } from 'react'

type BadgeColor =
    | "primary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "light"
    | "dark";

export interface InvoiceStatusBadgeProps {
    status: InvoiceStatus,
}

function InvoiceStatusBadge(props: InvoiceStatusBadgeProps) {

    const [badgeColor, setBadgeColor] = useState<BadgeColor>('primary');

    const getBadgeColor = () => {
        switch (props.status) {
            case InvoiceStatus.TO_BE_PAID:
                setBadgeColor('warning');
                break;
            case InvoiceStatus.CANCELLED:
                setBadgeColor('dark');
                break;
            case InvoiceStatus.OVERDUE:
                setBadgeColor('error');
                break;
            case InvoiceStatus.PAID:
                setBadgeColor('success');
                break;
        }
    }


    useEffect(() => {
        getBadgeColor()
    }, [props.status]);


    return (
        <Badge
            variant='light'
            size='sm'
            color={badgeColor}
            children={InvoiceStatus[props.status]}
        />
    );
}

export default InvoiceStatusBadge;