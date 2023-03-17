import Joi from "joi";
import { getDB } from "../config/mongodb.js";

// Define Card collection
const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    // eslint-disable-next-line no-unused-vars
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(value);
    return value;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardModel = {
  createNew,
};
