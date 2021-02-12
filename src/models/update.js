const mongoose= require('mongoose')

const mainDataSchema= new mongoose.Schema({
    totalTests:{type:Number,required:true},
    totalVacinatedOnce:{type:Number,required:true},
    totalVacinatedTwice:{type:Number,required:true},
    totalDeceased:{type:Number,required:true},
    totalActive:{type:Number,required:true},
    totalHospitalised:{type:Number,required:true},
    totalCritical:{type:Number,required:true},
    totalRessesitated:{type:Number,required:true},

    updateDates:[{type:Date,unique:true}],
    updateTests:[{
        totalDailyTests:{type:Number,required:true, min:0},
        totalDailyPositivesPrecentage:{type:Number,required:true, min:0,max:100},
    }],
    updateVacinations:[{
        totalDailyVacinatedOnce:{type:Number,required:true, min:0},
        totalDailyVacinatedTwice:{type:Number,required:true, min:0},

    }],
    updatePatients:[{
        totalDailyHospitalised:{type:Number,required:true},
        totalDailyActive:{type:Number,required:true},
        totalDailyCritical:{type:Number,required:true},
        totalDailyRessesitated:{type:Number,required:true},
        totalDailyDeceased:{type:Number,default:0,min:0},
    }]
})

const MainData= mongoose.model('MainData',mainDataSchema);
module.exports=MainData