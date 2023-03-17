import { BoardModel } from "../models/board.model.js";

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    // push notification
    // do something...v.v
    // transform data
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const BoardService = { createNew };
