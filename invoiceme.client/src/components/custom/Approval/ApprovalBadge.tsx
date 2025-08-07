import Badge from "../../../components/ui/badge/Badge";
import { ApprovalStatus } from "../../../enums/enum";

type HeaderProps = {
    Status: ApprovalStatus;
};

function ApprovalBadge({ Status }: HeaderProps) {
    if (Status === ApprovalStatus.PENDING) {
        return <Badge variant="solid" color="warning">PENDING</Badge>;
    } else if (Status === ApprovalStatus.APPROVED) {
        return <Badge variant="solid" color="success">APPROVED</Badge>;
    } else if (Status === ApprovalStatus.REJECTED) {
        return <Badge variant="solid" color="error">REJECTED</Badge>;
    }
    else {
        return null;
    }
}

export default ApprovalBadge;