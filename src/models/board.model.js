import Joi from "joi";
// import ObjectId from "mongodb";
import pkg from "mongodb";
const { ObjectId } = pkg;
import { getDB } from "../config/mongodb.js";
import { ColumnModel } from "./column.model.js";
import { CardModel } from "./card.model.js";

// Define board collection
const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        // eslint-disable-next-line no-unused-vars
        const result = await getDB()
            .collection(boardCollectionName)
            .insertOne(value);
        return value;
    } catch (error) {
        throw new Error(error);
    }
};
const update = async (id, data) => {
    try {
        const updateData = { ...data };
        // const value = await validateSchema(data);
        // eslint-disable-next-line no-unused-vars
        const result = await getDB()
            .collection(boardCollectionName)
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

/**
 *
 * @param {string} boradId
 * @param {string} columnId
 */
const pushColumnOrder = async (boradId, columnId) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(boradId) },
                { $push: { columnOrder: columnId } },
                { returnOriginal: false }
            );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

const getFullBoard = async (boardId) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .aggregate([
                { $match: { _id: new ObjectId(boardId), _destroy: false } },
                {
                    $lookup: {
                        from: ColumnModel.columnCollectionName,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "columns",
                    },
                },
                {
                    $lookup: {
                        from: CardModel.cardCollectionName,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "cards",
                    },
                },
            ])
            .toArray();

        return result[0] || {};
    } catch (error) {
        throw new Error(error);
    }
};

export const BoardModel = {
    createNew,
    getFullBoard,
    pushColumnOrder,
    update,
};
