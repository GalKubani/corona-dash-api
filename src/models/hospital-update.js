const mongoose= require('mongoose')

const hospitalDataSchema= new mongoose.Schema({
    name:{type:String,unique:true,trim:true,required:true},
    generalOccupancyPrecentage:{type:Number,min:0, max:100, required:true},
    covidOccupancyPrecentage:{type:Number,min:0, max:100, required:true},
    activeHospitalStaff:{type:Number,min:0,required:true}
})


const HospitalData= mongoose.model('HospitalData',hospitalDataSchema);
module.exports=HospitalData