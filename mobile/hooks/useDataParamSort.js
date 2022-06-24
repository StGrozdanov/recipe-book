export const useDataParamSort = (data, variable) => {
    return data.sort((a, b) => {
        let result;

        if (variable !== 0) {
            if (a.id === variable) {
                result = -1;
            } else if (b.id === variable) {
                result = 1;
            } else {
                result = 0;
            }
        } else {
            result = a.id - b.id;
        }
        return result;
    });
}