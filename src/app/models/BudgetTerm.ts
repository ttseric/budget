export class BudgetTerm{
    budgetTermId:number;
    seq: number;
    warning: string;
    unit: string;
    tenant: string;
    shop: string;
    floor: string;
    zone: string;
    termLevel: string;
    termGroup: string;
    evpMD: string;
    rfpMD: string;
    leaseMD: string;
    firstRenew: boolean;
    secondRenew: boolean;
    thirdRenew: boolean;
    chargeLevel: string;
    chargeGroup: string;
    businessUnit: string;
    commDate: Date;
    lastSyncDate: Date;
    expiryDate:Date;
    leaseNo:string;
    trade: string;
    subTrade: string;
    itemStartDate: Date;
    itemEndDate: Date;
    weightedArea: number;
    isDirty: boolean;
    isLocked: boolean;


    pcCharges: PCCharge[];
    rentReviews: RentReview[];
    currentTermAssumptions: TermAssumption[];
    editingTermAssumptions: TermAssumption[];
    contractualTerms: TermAssumption[];
    constructor(){
        this.pcCharges = [];
        this.rentReviews = [];
        this.currentTermAssumptions = [];
        this.contractualTerms = [];
    }
}
export class RentReview{
    rrDate: Date;
    condition: string;
    collarAmount: number;
    collarRate: number;
    capAmount: number;
    capRate: number;
}
export class PCCharge{
    chargeCode: string;
    description: string;
    shop: string;
    startDate: Date;
    endDate: Date;
    bf: string;
    amount: number;
}
export class TermAssumption{
    budgetTermId:number;
    seq:number;
    termAssumptionId: number;
    evpFrom: Date;
    evpTo: Date;
    evpMD: string;
    termFrom: Date;
    termTo: Date;
    termMD: string;
    renew: boolean;
    remarks: string;
    error: string;
    isLocked: boolean;
    rfpAssumptions: RfpAssumption[]

    constructor(){
        this.rfpAssumptions = [];
    }
}
export class RfpAssumption{
    rfpAssumptionId: number;
    rfpFrom: Date;
    rfpTo: Date;
    rfpMD: string;
    remarks: string;
    error:string;
}
