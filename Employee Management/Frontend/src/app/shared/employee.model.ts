export class Employee
{
    static reset() 
    {
        throw new Error('Employee class not executed !');
    }
    _id: string
    empname :string
    empno :string
    jobrole:string
    salary:string
    email :string
    phone :string

    constructor(_id: string, empno:string, empname: string, jobrole:string, salary:string, email: string, phone: string)
    {
        this._id = _id
        this.empno = empno
        this.empname = empname
        this.jobrole = jobrole
        this.salary = salary
        this.email = email
        this.phone = phone
    }
}