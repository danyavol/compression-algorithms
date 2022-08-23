type Tree = { item: string | [Tree, Tree], value: number };

export function huffmanEncode(text: string): string {
    /*********** #1 Create stats map ***********/

    const statsMap = new Map<string, number>();

    text.split('').forEach(symbol => {
        if (statsMap.has(symbol)) {
            const newValue = statsMap.get(symbol)! + 1;
            statsMap.set(symbol, newValue);
        } else {
            statsMap.set(symbol, 1);
        }
    });

    /*********** #2 Create tree ***********/

    const treeElements: Tree[] = Array.from(statsMap)
        .map(elem => ({ item: elem[0], value: elem[1]}))
        .sort((a, b) => a.value - b.value);

    while (treeElements.length > 1) {
        const firstTwoElements = treeElements.splice(0, 2);
        const subTree = firstTwoElements.reduce((a, b) => 
            ({ item: [a, b], value: a.value + b.value})
        );
        putTreeIntoSortedArray(treeElements, subTree)
    }

    const tree: Tree = treeElements[0];

    /*********** #3 Calculate codes map ***********/

    const codesMap = getSymbolCodes(tree, new Map());

    /*********** #4 Encode text using codes map ***********/

    const bitsString = text.split('').map(symbol => codesMap.get(symbol)).join('');

    return '0'.repeat(bitsString.length % 8) + bitsString;  
}

export function huffmanDecode(text: string): string {
    // TODO: Implement
    return "4";
}

function getSymbolCodes(
    tree: Tree, codesMap: Map<string, string>, currentCode: string = "", 
): Map<string, string> {
    if (typeof tree.item === "string") {
        codesMap.set(tree.item, currentCode);
    } else {
        getSymbolCodes(tree.item[0], codesMap, currentCode + "0");
        getSymbolCodes(tree.item[1], codesMap, currentCode + "1");
    }
    return codesMap;
}

function putTreeIntoSortedArray(array: Tree[], newTree: Tree): void {
    for (let [index, tree] of array.entries()) {
        if (newTree.value <= tree.value) {
            array.splice(index, 0, newTree);
            return;
        }
    }
    array.push(newTree);
}