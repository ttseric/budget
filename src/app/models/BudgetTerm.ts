export class BudgetTerm{
    budgetTermId:number;
    seq: number;
    isLocked: boolean;
    isDirty:boolean;
    warning: string;
    tenant: string;
    escalation: string;
    leaseTermLength: string;
    evpTermLength: string;
    rfpTermLength: string;
    firstRenew: boolean;
    secondRenew: boolean;
    thirdRenew: boolean;
    leaseExpireDate: Date;
    itemEndDate: Date;
    assumptionLevel: string;
    budgetDetailTerms: BudgetDetailTerm[];
    contractualTerms: BudgetDetailTerm[];
    constructor(){
        this.budgetDetailTerms = [];
        this.contractualTerms = [];
    }
}

export class BudgetDetailTerm{
    budgetTermDetailId: number;
    budgetTermId: number;
    budgetTermName: string;
    isLocked: boolean;
    termType: string;
    from: Date;
    to: Date;
    termLength:string;
    remarks:string;
}