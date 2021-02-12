const mongoose= require('mongoose')

const stoplightCityDataSchema= new mongoose.Schema({
    name:{type:String,unique:true,trim:true,required:true},
    population:{type:Number,min:100,max:950000,required:true},
    totalPatients:{type:Number,min:0, default:0},
    totalFirstVacinated:{type:Number,min:0, default:0},
    totalSecondVacinated:{type:Number,min:0, default:0},
    
    dailyStoplightData:[{
        newActivePatientsDaily:{type:Number},
        firstVacineDaily:{type:Number,min:0},
        secondVacineDaily:{type:Number,min:0},
        positivesPrecentageDaily:{type:Number,min:0,max:100}
    }]
})

const StoplightCityData= mongoose.model('StoplightCityData',stoplightCityDataSchema);
module.exports=StoplightCityData