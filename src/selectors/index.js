import * as R from 'ramda'

export const sortedPeoplesStr = (id, array, sorted) => {
    console.log("SELECTOR STR");
    console.log(id, array);
    if (sorted){
        //Inverse
        const sortByNameCaseInsensitive = R.sort(R.descend(R.compose(R.toLower, R.prop(id))));
        return sortByNameCaseInsensitive(array);
    } else {
        const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop(id)));
        return sortByNameCaseInsensitive(array);
    }

};

export const sortedPeoplesInt = (id, array,sorted) => {

    if (sorted){
        //Inverse
        const sortByIntItem = R.sort(R.descend(R.prop(id)));
        return sortByIntItem(array);
    } else {
        const sortByIntItem = R.sortBy(R.prop(id));
        return sortByIntItem(array);
    }


};

export const searchRecord = (itemStr, array) => {
    const id = array.indexOf(itemStr);
    const newArray = array[id];
    return newArray
};

