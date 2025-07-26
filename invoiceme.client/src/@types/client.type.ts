
export class ClientDTO {
    Id: number = 0;
    Name: string = '';
    Contact: string = '';
    Email: string = '';
    
    constructor(init?: Partial<ClientDTO>) {
        Object.assign(this, init);
    }
}