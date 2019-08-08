import { GridDef } from './gridDef';
export class Response{
    errCode: number;
    errMessage: string;
}
export class GetGridResponse extends Response{
    gridDef: GridDef;
}
export class LoginResponse extends Response{
    name: string;
    email: string;
    idToken:string;
}