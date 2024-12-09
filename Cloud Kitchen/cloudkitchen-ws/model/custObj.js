class Customer {
    constructor(obj){        
        this.customerId='';
        this.userName= obj.userName;
        this.password=obj.password;
        this.name= obj.name;
        this.email= obj.email;
        this.mobileNum= obj.mobileNum;
        this.address= obj.address;
        this.pincode= obj.pincode;
        this.profilePic='';

    }
}

module.exports = Customer;