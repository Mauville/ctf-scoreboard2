export enum FlagTypes {
    FLAG1_TRANSCEND,
    FLAG2_PROJECT,
    FLAG3_TRANSFORM,
    FLAG4_BITS,
    FLAG5_DPAD,
    FLAG6_SS,
    FLAG0_INVALID,
}
export enum FlagStrings{
    CORRECT = "Valid flag submitted!" ,
    INCORRECT = "That is not a valid flag :/",
    NEEDS_REFINING = "It won't be that easy! Try harder.",
    BING_BING = "Nice jumping you got there.",
    INCORRECT_PAD = "Hint: Use DPAD",
    SS = "AMAZING! You are a great hacker!",
}
export type FlagType = FlagTypes;
export type FlagString = FlagStrings;
export type FlagBundle = {flagtype:FlagType, flagstring: FlagString}