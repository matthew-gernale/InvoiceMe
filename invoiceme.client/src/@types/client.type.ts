
export class ClientDTO {
    Id: number = 0;
    Name: string = '';
    Contact: string = '';
    Email: string = '';
    Address: string = '';
    
    constructor(init?: Partial<ClientDTO>) {
        Object.assign(this, init);
    }
}

export class AddClientDTO {
    Email: string = '';
    FirstName: string = '';
    LastName: string = '';
    Address: string = '';
    Phone: string = '';

    constructor(init?: Partial<AddClientDTO>) {
        Object.assign(this, init);
    }
}

export class UpdateClientDetailsDTO {
    ClientId: number = 0;
    Email: string = '';
    FirstName: string = '';
    LastName: string = '';
    Address: string = '';
    Phone: string = '';

    constructor(init?: Partial<UpdateClientDetailsDTO>) {
        Object.assign(this, init);
    }
}