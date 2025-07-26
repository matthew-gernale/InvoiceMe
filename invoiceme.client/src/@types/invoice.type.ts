
import { InvoiceStatus } from '../enums/enum'

export class InvoiceDTO {
    Id: number = 0;
    InvoiceNo: string = '';
    ClientName: string = '';
    InvoiceDate: Date = new Date;
    Status: InvoiceStatus = InvoiceStatus.TO_BE_PAID;
    IsOverDue: boolean = false;
    Total: number = 0;

    constructor(init?: Partial<InvoiceDTO>) {
        Object.assign(this, init);
    }
}

export class CreateInvoiceDTO {
    DueDate: Date = new Date;
    SubTotal: number = 0;
    Tax: number = 0;
    Total: number = 0;
    ClientId: number = 0;
    Items: InvoiceItemDTO[] = [];

    constructor(init?: Partial<CreateInvoiceDTO>) {
        Object.assign(this, init);
    }
}

export class InvoiceItemDTO {
    Title: string = '';
    Qty: number = 0;
    UnitPrice: number = 0;

    constructor(init?: Partial<InvoiceItemDTO>) {
        Object.assign(this, init);
    }
}

export class UpdateInvoiceStatusDTO {
    InvoiceId: number = 0;
    Status: InvoiceStatus = InvoiceStatus.TO_BE_PAID;

    constructor(init?: Partial<UpdateInvoiceStatusDTO>) {
        Object.assign(this, init);
    }
}

export class InvoiceDetailsDTO {
    Id: number = 0;
    InvoiceNo: string = '';
    ClientName: string = '';
    InvoiceDate: Date = new Date;
    DueDate: Date | null = null;
    Status: InvoiceStatus = InvoiceStatus.TO_BE_PAID;
    SubTotal: number = 0;
    Tax: number = 0;
    Total: number = 0;
    InvoiceItems: InvoiceItemDTO[] = [];

    constructor(init?: Partial<InvoiceDetailsDTO>) {
        Object.assign(this, init);
    }
}
