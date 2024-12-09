class  restaurantSchema{
constructor(obj){
    this.restaurantId='';
    this.restaurantPassword=obj.restaurantPassword;
    this.restaurantName=obj.restaurantName;
    this.restaurantAddress= obj.restaurantAddress;
    this.restaurantEmail=obj.restaurantEmail;
    this.restaurantAbout= obj.restaurantAbout;
    this.restaurantPincode= obj.restaurantPincode;
    this.restaurantMobile= obj.restaurantMobile;
    this.restaurantPhoto= obj.restaurantPhoto;
    this.restaurantRating=obj.restaurantRating;
}
}
module.exports = restaurantSchema;

