import { BoardModel } from "../models/board.model.js";
import pkg from "lodash";
const { cloneDeep } = pkg;
// import cloneDeep from "lodash";

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

        const transformBoard = cloneDeep(board);
        // Filter deleted columns
        transformBoard.columns = transformBoard.columns.filter(
            (column) => !column._destroy
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
export const BoardService = { createNew, getFullBoard };
