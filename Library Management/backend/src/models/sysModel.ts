import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let sysModel = new Schema(
    {
        
        id: {
            type: Number
        },
        extendPeriod: {
            type: Number
        }


    }
)

export default mongoose.model('sysModel', sysModel, 'sysVariables');