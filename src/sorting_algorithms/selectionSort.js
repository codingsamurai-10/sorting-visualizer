export async function selectionSort(vueInstance) {
    let n = vueInstance.arrayToSort.length;
    for (let i = 0; i < n - 1; ++i) {
        let min = i;
        vueInstance.changeColourOfBar(i, 1);
        for (let j = i + 1; j < n; ++j) {
            vueInstance.changeColourOfBar(j, 2);
            await vueInstance.addExplicitWaitingTime();
            if (vueInstance.arrayToSort[j].value < vueInstance.arrayToSort[min].value) {
                min = j;
            }
            vueInstance.changeColourOfBar(j);
        }
        vueInstance.changeColourOfBar(i);
        let temp = vueInstance.arrayToSort[min];
        vueInstance.$set(vueInstance.arrayToSort, min, vueInstance.arrayToSort[i]);
        vueInstance.$set(vueInstance.arrayToSort, i, temp);
    }
}