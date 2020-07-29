import * as R from 'ramda'

//Сортировка строковая
export const sortedPeoplesStr = (id, array, sorted) => {
    if (sorted){
        //Inverse
        const sortByNameCaseInsensitive = R.sort(R.descend(R.compose(R.toLower, R.prop(id))));
        return sortByNameCaseInsensitive(array);
    } else {
        const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop(id)));
        return sortByNameCaseInsensitive(array);
    }

};

//Сортировка числовая
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

// Поиск записи
export const searchRecord = (itemStr, array) => {
    const newArray = [];
    if (itemStr ==="" || itemStr === undefined){
        return array.people
    }
    for (let itemKey in array.people){
        // Поиск по целой строке
        // for (let itemName in array.people[itemKey]){
        //     if (array.people[itemKey][itemName] === itemStr){
        //         newArray.push(array.people[itemKey])
        //     }
        // }
        for (let itemName in array.people[itemKey]){
            let mainString = array.people[itemKey][itemName]+"";
            if (mainString.indexOf(itemStr)>-1){
                newArray.push(array.people[itemKey])
            }
        }
    }
    if (newArray.length !== 0){
        return newArray
    }
    return array
};

