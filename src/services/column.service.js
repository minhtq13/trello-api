import { ColumnModel } from "../models/column.model.js";

const createNew = async (data) => {
  try {
    const result = await ColumnModel.createNew(data);
    // push notification
    // do something...v.v
    // transform data
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updateAt: Date.now(),
    };
    const result = await ColumnModel.update(id, updateData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const ColumnService = { createNew, update };
