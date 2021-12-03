let admin = require('../settings/firebase');
let db = admin.firestore();

const difference = (a, b) => a.filter(x => !b.includes(x)).concat(b.filter(x => !a.includes(x)));

async function getLostSteps(){
    let savedLostSteps = [];
    let snapshot = await db.collection("lost_steps").get()

    if(!snapshot.empty){
        for (let doc of snapshot.docs){
            let data = doc.data();
            savedLostSteps.push(data)
        }
    }
    return savedLostSteps
}

async function saveLostSteps(lostSteps, initialLostSteps){
    let lostStepsToSave = difference(initialLostSteps, lostSteps)
    console.log(lostSteps)
    console.log(initialLostSteps)
    console.log(lostStepsToSave)
    for(let lostStep of lostStepsToSave){
        await db.collection("lost_steps").doc().set(lostStep,{merge:true})
    }
}

module.exports = {
    getLostSteps,
    saveLostSteps
};