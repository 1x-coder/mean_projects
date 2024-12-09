const { Schema } = require('mongoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
const uri = "mongodb+srv://admin:adminbhukkad321@cluster1.pu0hb.mongodb.net/bhukkad_db?retryWrites=true&w=majority";

// template of admin data for admin-database
const adminSchema = Schema({
    mobileNum: {
        type: Number,
        required: [true, 'mobileNum required'],
        unique: true
    },
    password: { type: String, required: [true, 'password required'] },
}, { collection: "Admins", timestamps: true });

// template of customer data for customer-database
const customerSchema = Schema({
    customerId: {
        type: String,
        required: [true, 'customerId required'],
        unique: true
    },
    userName: {
        type: String,
        required: [true, 'userName required'],
        unique: true
    },
    password: { type: String, required: [true, 'password required'] },
    name: { type: String, required: [true, 'name required'] },
    profilePic: { type: String }, // will contain image url
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true
    },
    mobileNum: {
        type: Number,
        required: [true, 'mobileNum required'],
        unique: true
    },
    address: { type: String, required: [true, 'address required'] },
    pincode: { type: Number, required: [true, 'pincode required'] },
}, { collection: "Customers", timestamps: true });

// template of restaurant data for restaurant-database
const restaurantSchema = Schema({
    restaurantId: {
        type: String,
        required: [true, 'customerId required'],
        unique: true
    },
    restaurantPassword: { type: String, required: [true, 'password required'] },
    restaurantName: { type: String, required: [true, 'restaurantName required'] },
    restaurantAddress: { type: String, required: [true, 'restaurantAddress required'] },
    restaurantPincode: { type: Number, required: [true, 'restaurantPincode required'] },
    restaurantAbout: { type: String, required: [true, 'restaurantName required'] },
    restaurantEmail: {
        type: String,
        required: [true, 'email required'],
        unique: true
    },
    restaurantMobile: {
        type: Number,
        required: [true, 'restaurantMobile required'],
        unique: true
    },
    restaurantPhoto: { type: String, required: [true, 'restaurantPhoto required'] }, // will contain image url
    restaurantAmbience: { type: Array, default: [] }, // will contain image urls
    restaurantRating: { type: Number },
    menu: {
        starter: { type: Array, default: [] }, // will contain foodIds
        mainCourse: { type: Array, default: [] },
        dessert: { type: Array, default: [] },
        juice: { type: Array, default: [] },
    },
}, { collection: "Restaurants", timestamps: true });

// template of food data for food-database
const foodSchema = Schema({
    foodId: {
        type: String,
        required: [true, 'customerId required'],
        unique: true
    },
    restaurantId: { type: String, required: [true, 'restaurantId required'] },
    img: { type: String, required: [true, 'image required'] }, // will contain image url
    name: { type: String, required: [true, 'name required'] },
    description: { type: String },
    category: {
        type: String,
        required: [true, 'type required'],
        enum: ['starter', 'mainCourse', 'dessert', 'juice']
    }, // starter/main-course/dessert/juice
    type: { type: String, required: [true, 'category required'] }, // north-indian/south-india/etc..
    veg: { type: Boolean, required: [true, 'veg/non-veg required'] },
    foodRating: { type: Number },
    price: { type: Number, required: [true, 'price required'] },
    discount: { type: Number, required: [true, 'discount required'] },
    available: { type: Boolean, required: [true, 'availability required'] },
}, { collection: "Food", timestamps: true });

// template of orders data for orders-database
const ordersSchema = Schema({
    orderId: {
        type: String,
        required: [true, 'orderId required'],
        unique: true
    },
    restaurant: { type: String, required: [true, 'restaurantId required'] },
    customer: { type: String, required: [true, 'customerId required'] },
    deliveryPerson: { type: String, default: '' },
    food: { type: Array, default: [] },
    deliveryCost: { type: Number, required: [true, 'deliveryCost required'] },
    totalCost: { type: Number, required: [true, 'totalCost required'] },
    orderDate: { type: String, required: [true, 'date is required'] },
    state: {
        type: String,
        required: [true, 'state required'],
        enum: ['pending','preparing', 'alloted-delivery', 'cooked', 'picked', 'completed', 'cancelled'],
        default: 'pending'
    },
}, { collection: "Orders", timestamps: true });

// template of deliveryPerson data for deliveryPerson-database
const deliveryPersonSchema = Schema({
    deliveryPersonId: {
        type: String,
        required: [true, 'deliveryPersonId required'],
        unique: true
    },
    name: { type: String, required: [true, 'name required'] },
    email: { type: String, required: [true, ' email required'], unique: true },
    password: { type: String, required: [true, 'password required'] },
    mobileNum: { type: String, required: [true, 'mobileNum required'], unique: true },
    deliveryPersonImage: {
        type: String,
        required: [true, 'delivery person image required']
    }, // will contain image url
    penalties: { type: Array, default: [] },
    deliveryPersonRating: {
        type: Number,
        required: [true, 'deliveryPersonRating required'],
        default: 0
    },
}, { collection: "DeliveryPerson", timestamps: true });

// template of penalities data for penalities-database
const penaltiesSchema = Schema({
    penaltiesId: {
        type: String,
        required: [true, 'penalitiesId required'],
        unique: true
    },
    order: { type: String, required: [true, 'orderId required'] },
    deliveryPerson: { type: String, required: [true, 'deliveryPersonId required'] },
    penalityCost: { type: Number, required: [true, 'penalityCost required'] },
    paid: {
        type: Boolean,
        required: [true, 'paid or not required'],
        default: false
    },
}, { collection: "Penalities", timestamps: true });

// to fetch collections from database 
const connection = {}

connection.getAdminCollection = () => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(database => {
        return database.model('Admins', adminSchema)
    }).catch(() => {
        const err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}

connection.getCustomerCollection = () => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(database => {
        return database.model('Customers', customerSchema)
    }).catch(() => {
        const err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}

connection.getRestaurantCollection = () => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(database => {
        return database.model('Restaurants', restaurantSchema)
    }).catch(() => {
        const err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}

connection.getFoodCollection = () => {

    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(database => {
        return database.model('Food', foodSchema)
    }).catch(() => {
        const err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}

connection.getOrdersCollection = () => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(database => {
        return database.model('Orders', ordersSchema)
    }).catch(() => {
        const err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}

connection.getDeliveryPersonCollection = () => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(database => {
        return database.model('DeliveryPerson', deliveryPersonSchema)
    }).catch(() => {
        const err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}

connection.getPenaltiesCollection = () => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(database => {
        return database.model('Penalities', penaltiesSchema)
    }).catch(() => {
        const err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}

module.exports = connection;