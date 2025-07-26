
import Badge from '../badge/Badge'
import { ApprovalStatus } from '../../../enums/enum' 
import { useState, useEffect } from 'react'

type BadgeColor =
    | "primary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "light"
    | "dark";

export interface ApprovalBadgeProps {
    status: ApprovalStatus,
}

function ApprovalBadge(props: ApprovalBadgeProps) {

    const [badgeColor, setBadgeColor] = useState<BadgeColor>('primary');

    const getBadgeColor = () => {
        switch (props.status) {
            case ApprovalStatus.PENDING:
                setBadgeColor('warning');
                break;
            case ApprovalStatus.APPROVED:
                setBadgeColor('success');
                break;
            case ApprovalStatus.REJECTED:
                setBadgeColor('error');
                break;
            case ApprovalStatus.CANCELED:
                setBadgeColor('dark');
                break;
            case ApprovalStatus.DONE:
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
          children={ApprovalStatus[props.status]}
      />
  );
}

export default ApprovalBadge;