


import { ApprovalStatus, BankType } from '../enums/enum'


export class PaymentDTO {
    Id: number = 0;
    Client: string = '';
    RefNo: string = '';
    Amount: number = 0;
    BankType: BankType = BankType.CASH;
    Description: string = '';
    Status: ApprovalStatus = ApprovalStatus.PENDING;
    RejectReason: string = '';
    ProofOfPayments: string[] = [];
    DateCreated: Date = new Date;
    ApprovedByName: string = '';
    ApprovalDate: Date = new Date;

    constructor(init?: Partial<PaymentDTO>) {
        Object.assign(this, init);
    }
}

export class AddPaymentDTO {
    RefNo: string = '';
    Amount: number = 0;
    BankType: BankType = BankType.CASH;
    Description: string = '';
    ProofOfPayments: string[] = [];
    InvoiceId: number = 0;

    constructor(init?: Partial<AddPaymentDTO>) {
        Object.assign(this, init);
    }
}

export class UpdatePaymentStatusDTO {
    PaymentId: number = 0;
    Status: ApprovalStatus = ApprovalStatus.PENDING;
    Reason: string = '';

    constructor(init?: Partial<UpdatePaymentStatusDTO>) {
        Object.assign(this, init);
    }
}