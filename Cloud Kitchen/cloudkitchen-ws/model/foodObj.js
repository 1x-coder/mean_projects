class food{
    constructor(obj){
        this.foodId="";
        this.restaurantId=obj.restaurantId;
        this.img=obj.img;
        this.name=obj.name;
        this.description= obj.description;
        this.category=obj.category;
        this.type=obj.category;
        this.veg=this.veg;
        this.price=obj.price;
        this.discount=obj.discount;
        this.available=obj.available;

    }
}
module.exports = food;