export type BoardData = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | null;
export type BoardBox = [
    BoardData,
    BoardData,
    BoardData,
    BoardData,
    BoardData,
    BoardData,
    BoardData,
    BoardData,
    BoardData
];
export type SourceBoard = [
    BoardBox,
    BoardBox,
    BoardBox,
    BoardBox,
    BoardBox,
    BoardBox,
    BoardBox,
    BoardBox,
    BoardBox
];
type Position = {
    box: string;
    row: string;
    col: string;
};
export type BoardState = {
    puzzle: SourceBoard;
    solution: SourceBoard;
    currentState: SourceBoard;
    difficulty: string;
    mistakes: number;
    history: {
        data: string;
        position: Position;
    }[];
};
export declare const gameState: {
    boardState: BoardState | null;
};
/** Creates board source data from string. */
export declare function createSourceBoard(sourceString: string): SourceBoard;
export declare function createBoard(): HTMLDivElement | undefined;
export declare function showBoard(): boolean;
/** Highlits all the entries in the impact zone of `entry` */
export declare function highlightImpact(entry: HTMLDivElement): void;
/**  */
export declare function removeImpact(): void;
/** Changes focus to given position of entry. */
export declare function changeFocusTo(row: number, col: number, addImpact?: boolean): void;
export declare function moveFocus(direction: ("u" | "d" | "l" | "r"), mag?: number): void;
export declare function getPosition(entry: HTMLDivElement): Position | undefined;
/** Adds value to the entry and changes to progress. Validates the entry by default. */
export declare function addEntry(num: string, validate?: boolean): void;
/** Checks if the entry is valid. `force` = true, forces it to check the impact zone even if the entry is empty. */
export declare function checkEntry(entry: HTMLDivElement, force?: boolean): void;
export declare function removeEntry(): void;
export declare function calculateProgress(show?: boolean): number;
export {};
//# sourceMappingURL=sudoku.d.ts.map