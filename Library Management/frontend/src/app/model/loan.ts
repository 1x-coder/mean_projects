export class Loan{
    idBook: number;
    title: string;
    deadLine: Date;
    username: string;
    writer: Array<String>;
    loanDate: Date;
    returnDate: Date;
    picture: string;
    processed: boolean;
    extended: boolean;
    returnedBook: boolean;
    idLoan: number;
    extendPeriod: number;
}