import { CardModel } from "../models/card.model.js";
import { ColumnModel } from "../models/column.model.js";

const createNew = async (data) => {
  try {
    const newCard = await CardModel.createNew(data);
    // updated cardOrder Array in board collection
    await ColumnModel.pushCardOrder(
      newCard.columnId.toString(),
      newCard._id.toString()
    );

    return newCard;
  } catch (error) {
    throw new Error(error);
  }
};
export const CardService = { createNew };
