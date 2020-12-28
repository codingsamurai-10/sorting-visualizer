export async function selectionSort(vueInstance, arrayToSort, changeColourOfBar, addExplicitWaitingTime) {
    let n = arrayToSort.length;
    for (let i = 0; i < n - 1; ++i) {
        let min = i;
        changeColourOfBar(i, 1);
        for (let j = i + 1; j < n; ++j) {
            changeColourOfBar(j, 2);
            await addExplicitWaitingTime();
            if (arrayToSort[j].value < arrayToSort[min].value) {
                min = j;
            }
            changeColourOfBar(j);
        }
        changeColourOfBar(i);
        let temp = arrayToSort[min];
        vueInstance.$set(arrayToSort, min, arrayToSort[i]);
        vueInstance.$set(arrayToSort, i, temp);
    }
}