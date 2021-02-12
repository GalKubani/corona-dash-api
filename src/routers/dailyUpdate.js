const express= require('express');
const MainData= require('../models/update');
const router= new express.Router()

async function editAndReturnUpdateObj(body){
    const mainData=await MainData.find({})
    mainData[0].updateDates.push(body.updateDates)
    mainData[0].totalTests+=((body.updateTests.totalDailyTests)*1)
    mainData[0].totalVacinatedOnce+=((body.updateVacinations.totalDailyVacinatedOnce)*1)
    mainData[0].totalVacinatedTwice+=((body.updateVacinations.totalDailyVacinatedTwice)*1)
    mainData[0].totalDeceased+=((body.updatePatients.totalDailyDeceased)*1)
    mainData[0].totalHospitalised+=((body.updatePatients.totalDailyHospitalised)*1)
    mainData[0].totalActive+=((body.updatePatients.totalDailyActive)*1)
    mainData[0].totalCritical+=((body.updatePatients.totalDailyCritical)*1)
    mainData[0].totalRessesitated+=((body.updatePatients.totalDailyRessesitated)*1)
    mainData[0].updateTests.push(body.updateTests)
    mainData[0].updateVacinations.push(body.updateVacinations)
    mainData[0].updatePatients.push(body.updatePatients)
    
    return mainData[0];
    // will run every time an update is made
}
router.post('/updateObj/new', async(req,res)=>{
    try{
        const mainData= new MainData(req.body)
        await mainData.save();
        res.send(mainData);
    }catch(err){
        res.status(400).send({
            status:400, message: err.message,
        });
    }
});
router.get('/getUpdateObj',async(req,res)=>{
    try{
        const mainData= await MainData.findOne({})
        if(!mainData){
            return res.status(404).send({
                status:404,
                message: "data not found"
            });
        }
        res.send(mainData)
    }catch(err){
        res.status(500).send(err);
    }
})
router.patch('/edit-update-obj',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['updateDates','updateTests','updateVacinations','updatePatients']
    const isValidOperation= updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid updates!"})
    }
    try{
        const mainData= await editAndReturnUpdateObj(req.body)
        await MainData.findOneAndUpdate({},{mainData})
        await mainData.save();
        res.send(mainData)
    }catch(error){
        res.status(400).send(error.message)
    }
})

module.exports=router