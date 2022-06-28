const fetch = require('node-fetch');

const accessLevels = {
    admin: 3,
    worker: 2,
    citizen: 1,
    noRights: 0
};
Object.freeze(accessLevels);
const smartAuthURL = "http://supersmartcity.de:9760";
async function getDataFromSmartAuth(token, isWorker){
    if(isWorker){
        token = token.split('finanzamt-worker-')[1]
    }
    const formBody = [];
    formBody.push(encodeURIComponent("code") + '=' + encodeURIComponent(token));
    citizen = null;
    if(token){
        return await fetch(smartAuthURL+(isWorker?"/employee":"")+'/verify', { 
            method: 'POST', 
            body: formBody.join('&'), 
            headers: { 'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8" } 
        })
        .then(response => {
            console.log(response.status)
            if (response.status === 200) {
                return response.json();
            } 
            return null;
        })
        .then(data =>{
            if(data){
                return data;
            }
        })
        .catch(error =>{console.log(error);return null;});
    }
}

const auth = async (token, accessLevel, requestedID) => {
    isAdmin = token.startsWith("finanzamt-worker-");
    citizen = await getDataFromSmartAuth(token,isAdmin);
    if(citizen && isAdmin && requestedID!=undefined){ 
        return requestedID // Request from admin -> grant rights
    }
    if(citizen && isAdmin && requestedID==undefined){ 
        return 1 
    }
    if(!accessLevel || accessLevel == accessLevels.noRights){
        return requestedID ? requestedID : citizen ? citizen.citizen_id : 1; // Grant access
    }
    if(citizen && accessLevel == accessLevels.citizen){ 
        if(requestedID != undefined){ // specific id was requested
            return citizen.citizen_id==requestedID ? citizen.citizen_id : 0; 
        }
        return citizen.citizen_id;  // no specific id was requested
    }
    return 0; // deny access
}
 
const getID = async (token) => {
    isAdmin = token.startsWith("finanzamt-worker-");
    let data = await getDataFromSmartAuth(token, isAdmin);
    if(isAdmin){
        return data.id;
    }
    return data.citizen_id;
}

module.exports = {
    auth,
    accessLevels,
    getID
}