import { HttpStatusCode } from '../enums/httpStatusCode'
import { ApprovalStatus, BankType, UserRoles, DateStatus, InvoiceStatus } from '../enums/enum'

export class GeneralResponse<T> {
    IsSuccess: boolean = false;
    FailedMessage: string = '';
    StatusCode: HttpStatusCode = HttpStatusCode.BadRequest;
    Data?: T | null = null;

    constructor(init?: Partial<GeneralResponse<T>>) {
        Object.assign(this, init);
    }
}

export class GetPaginatedDTO {
    Take: number = 10;
    Skip: number = 0;
    SearchValue: string = '';
    UserId: string | null = null;

    ApprovalStatus: ApprovalStatus | null = null;
    InvoiceStatus: InvoiceStatus | null = null;
    BankType: BankType | null = null;
    UserRoles: UserRoles | null = null;
    DateStatus: DateStatus | null = null;

    DateStart: Date | null = null;
    DateEnd: Date | null = null;

    CustomerId: number = 0;

    constructor(init?: Partial<GetPaginatedDTO>) {
        Object.assign(this, init);
    }
}

export class PaginatedTableResponse<T> {
    ResponseData: T[] | null = null;
    Count: number = 0;

    constructor(init?: Partial<PaginatedTableResponse<T>>) {
        Object.assign(this, init);
    }
}

export class PaginatedCountsResponse {
    AllCount: number = 0;
    PendingCount: number = 0;
    ApprovedCount: number = 0;
    RejectedCount: number = 0;
    CancelledCount: number = 0;
    DoneCount: number = 0;
    ToBePaidCount: number = 0;
    PendingPaymentCount: number = 0;
    PaidCount: number = 0;

    constructor(init?: Partial<PaginatedCountsResponse>) {
        Object.assign(this, init);
    }
}


