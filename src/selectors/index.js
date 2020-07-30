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
export const sortedPeoplesInt = (id, array, sorted) => {

    console.log("Sort");
    console.log(array);
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
    if (itemStr === "" || itemStr === undefined){
        return array
    }
    for (let itemKey in array){

        // Поиск по целой строке
        // for (let itemName in array.people[itemKey]){
        //     if (array.people[itemKey][itemName] === itemStr){
        //         newArray.push(array.people[itemKey])
        //     }
        // }
        for (let itemName in array[itemKey]){

            let mainString = array[itemKey][itemName]+"";
            if (mainString.indexOf(itemStr)>-1){
                newArray.push(array[itemKey])
            }
        }
    }
    if (newArray.length !== 0){
        return newArray
    }
    return array
};


export const calcPages = (curPage, array) => {
    const offset = 30;
    const endPoint = offset * curPage;
    const startPoint = endPoint - offset;
    const people = [];
    for (let i = startPoint; i < endPoint; i++){
        if (array[i] === undefined){
            break
        }
        people.push(array[i])
    }
    return people
};

