import { BoardModel } from "../models/board.model.js";
// import { cloneDeep } from "lodash";
import pkg from "lodash";
const { cloneDeep } = pkg;
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

const getFullBoard = async (boardId) => {
    try {
        const board = await BoardModel.getFullBoard(boardId);

        if (!board || !board.columns) {
            throw new Error("Board not found!");
        }

        // Filter deleted column
        const transformBoard = cloneDeep(board);
        transformBoard.columns = transformBoard.columns.filter(
            (column) => column._destroy === false
        );
        // Add card to each column
        transformBoard.columns.forEach((column) => {
            column.cards = transformBoard.cards.filter(
                (c) => c.columnId.toString() === column._id.toString()
            );
        });
        // Sort columns by columnOrder, sort cards by cardOrder, this step will pass to FE DEV
        // Remove cards data from boards
        delete transformBoard.cards;
        return transformBoard;
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
        if (updateData._id) delete updateData._id;
        if (updateData.columns) delete updateData.columns;

        const updatedBoard = await BoardModel.update(id, updateData);

        return updatedBoard;
    } catch (error) {
        throw new Error(error);
    }
};
export const BoardService = { createNew, getFullBoard, update };
