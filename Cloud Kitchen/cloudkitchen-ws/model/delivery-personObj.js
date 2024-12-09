class deliveryPerson {
    constructor(obj) {
        this.deliveryPersonId = '';
        this.name = obj.name;
        this.email = obj.email;
        this.password = obj.password;
        this.mobileNum = obj.mobileNum;
        this.deliveryPersonImage = obj.deliveryPersonImage;
        this.penalties = [];
        this.deliveryPersonRating = 0;
    }
}

module.exports = deliveryPerson;
