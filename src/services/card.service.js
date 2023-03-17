import { CardModel } from "../models/card.model.js";

const createNew = async (data) => {
  try {
    const result = await CardModel.createNew(data);
    // push notification
    // do something...v.v
    // transform data
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const CardService = { createNew };
