import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';

export class GridDef{
    gridName: string;
    sortModels: SortModel[]
    colStates:ColumnState[];

    constructor(){
        this.sortModels =[];
        this.colStates = [];
    }
}
// export class ColState{
//     aggFunc: any;
//     colId:string;
//     hide: boolean;
//     pinned: string;
//     rowGroupIndex: number;
//     pivotIndex: number;
//     width:number;
// }
export class SortModel{
    colId:string;
    sort: string;
}