export const capitalize = (word) =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();

export const findInImgTypes = (type, array) =>
    array?.find((element) => element.type === type);