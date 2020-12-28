export async function insertionSort(vueInstance, arrayToSort, changeColourOfBar, addExplicitWaitingTime) {
    let n = arrayToSort.length;
    for (let i = 1; i < n; ++i) {
        for (let j = i - 1; j >= 0; --j) {
            changeColourOfBar(j, 1);
            changeColourOfBar(j + 1, 2);
            await addExplicitWaitingTime();
            if (arrayToSort[j].value > arrayToSort[j + 1].value) {
                let temp = arrayToSort[j];
                vueInstance.$set(arrayToSort, j, arrayToSort[j + 1]);
                vueInstance.$set(arrayToSort, j + 1, temp);
            } else {
                changeColourOfBar(j);
                changeColourOfBar(j + 1);
                break;
            }
            changeColourOfBar(j);
            changeColourOfBar(j + 1);
        }
    }
}