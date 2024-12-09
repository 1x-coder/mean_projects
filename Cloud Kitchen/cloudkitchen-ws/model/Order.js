class Order {
    constructor(obj){        
        this.restaurant= obj.restaurant,
        this.customer= obj.customer,
        this.deliveryPerson= '',
        this.food= obj.food,
        this.deliveryCost= obj.deliveryCost,
        this.totalCost= obj.totalCost,
        this.orderDate = obj.orderDate,
        this.state= 'pending'
        
    }
}

module.exports = Order;