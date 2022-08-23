export function bitsStringToTypedArray(bitsString: string): Uint8Array {
    console.log(bitsString);
    const partSize = 8;
    let partNumber = 0;

    const array: number[] = [];
    do {
        const part = bitsString.slice(partNumber * partSize, ++partNumber * partSize);
        array.push(parseInt(part, 2));

    } while (partNumber * partSize < bitsString.length)
    console.log(array);

    return new Uint8Array(array);
}

export function typedArrayToBitsString(buffer: Uint8Array): string {
    return Array.from(buffer).map(value => {
        const bitsString = value.toString(2);
        return '0'.repeat(8 - bitsString.length) + bitsString;
    }).join('');
}