import CamperModel from "../database/models/CamperModel";
import { ICamper } from "../interfaces/ICamper";

export const getCamperData = async (id: string): Promise<ICamper> => {
  const camperData = 
    (await CamperModel.findOne({ discordId: id })) ||
    (await CamperModel.create({
        discordId: id,
        round: 1,
        day: 0,
        date: Date.now()
    }));
    
    return camperData;
};
