import { ICamper } from "../database/models/CamperModel";

export const updateCamperData = async (Camper: ICamper) => {
    Camper.day++;
    if (Camper.day > 100) {
        Camper.day = 1;
        Camper.round++;        
    }

    Camper.timestamp = Date.now();
    await Camper.save();
    return Camper;
};
