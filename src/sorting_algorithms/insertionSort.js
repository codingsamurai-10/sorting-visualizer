export async function insertionSort(vueInstance) {
    let n = vueInstance.arrayToSort.length;
    for (let i = 1; i < n; ++i) {
        for (let j = i - 1; j >= 0; --j) {
            vueInstance.changeColourOfBar(j, 1);
            vueInstance.changeColourOfBar(j + 1, 2);
            await vueInstance.addExplicitWaitingTime();
            if (vueInstance.arrayToSort[j].value > vueInstance.arrayToSort[j + 1].value) {
                let temp = vueInstance.arrayToSort[j];
                vueInstance.$set(vueInstance.arrayToSort, j, vueInstance.arrayToSort[j + 1]);
                vueInstance.$set(vueInstance.arrayToSort, j + 1, temp);
            } else {
                vueInstance.changeColourOfBar(j);
                vueInstance.changeColourOfBar(j + 1);
                break;
            }
            vueInstance.changeColourOfBar(j);
            vueInstance.changeColourOfBar(j + 1);
        }
    }
}