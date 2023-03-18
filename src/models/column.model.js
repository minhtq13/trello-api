import Joi from "joi";
import pkg from "mongodb";
const { ObjectId } = pkg;
import { getDB } from "../config/mongodb.js";

// Define Column collection
const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(), // aslo ObjectId when create new
    title: Joi.string().required().min(3).max(20).trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data);
        const insertValue = {
            ...validatedValue,
            boardId: new ObjectId(validatedValue.boardId),
        };
        // eslint-disable-next-line no-unused-vars
        const result = await getDB()
            .collection(columnCollectionName)
            .insertOne(insertValue);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 *
 * @param {string} columnId
 * @param {string} cardId
 */
const pushCardOrder = async (columnId, cardId) => {
    try {
        const result = await getDB()
            .collection(columnCollectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(columnId) },
                { $push: { cardOrder: cardId } },
                { returnOriginal: false }
            );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            boardId: new ObjectId(data.boardId),
        };
        // const value = await validateSchema(data);
        // eslint-disable-next-line no-unused-vars
        const result = await getDB()
            .collection(columnCollectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { returnOriginal: false }
            );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const ColumnModel = {
    columnCollectionName,
    createNew,
    pushCardOrder,
    update,
};
