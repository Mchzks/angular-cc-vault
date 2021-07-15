export class CC {
    id?: string;
    owner: string;
    numberCC: string;
    expire: string;
    cvv: number;
    created: Date;
    updated: Date;

    constructor(owner: string, numberCC: string, expire: string, cvv: number) {
        this.owner = owner;
        this.numberCC = numberCC;
        this.expire = expire;
        this.cvv = cvv;
        this.created = new Date();
        this.updated = new Date();
    }
}