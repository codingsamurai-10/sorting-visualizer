export async function bubbleSort(vueInstance, arrayToSort, changeColourOfBar, addExplicitWaitingTime) {
    let n = arrayToSort.length;
    for (let i = 1; i < n; ++i) {
        var flag = true;
        for (let j = 0; j < n - i; ++j) {
            changeColourOfBar(j, 2);
            changeColourOfBar(j + 1, 1);
            await addExplicitWaitingTime();
            if (arrayToSort[j].value > arrayToSort[j + 1].value) {
                flag = false;
                let temp = arrayToSort[j];
                vueInstance.$set(arrayToSort, j, arrayToSort[j + 1]);
                vueInstance.$set(arrayToSort, j + 1, temp);
            }
            changeColourOfBar(j);
            changeColourOfBar(j + 1);
        }
        if (flag) break;
    }
}