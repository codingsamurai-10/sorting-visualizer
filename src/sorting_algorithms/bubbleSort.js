export async function bubbleSort(vueInstance) {
    let n = vueInstance.arrayToSort.length;
    for (let i = 1; i < n; ++i) {
        var flag = true;
        for (let j = 0; j < n - i; ++j) {
            vueInstance.changeColourOfBar(j, 2);
            vueInstance.changeColourOfBar(j + 1, 1);
            await vueInstance.addExplicitWaitingTime();
            if (vueInstance.arrayToSort[j].value > vueInstance.arrayToSort[j + 1].value) {
                flag = false;
                let temp = vueInstance.arrayToSort[j];
                vueInstance.$set(vueInstance.arrayToSort, j, vueInstance.arrayToSort[j + 1]);
                vueInstance.$set(vueInstance.arrayToSort, j + 1, temp);
            }
            vueInstance.changeColourOfBar(j);
            vueInstance.changeColourOfBar(j + 1);
        }
        if (flag) break;
    }
}