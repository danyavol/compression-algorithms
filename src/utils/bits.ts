export function bitsStringToTypedArray(bitsString: string): Uint8Array {
    if (!bitsString) return new Uint8Array();
    const partSize = 8;
    let partNumber = 0;

    const array: number[] = [];
    do {
        const part = bitsString.slice(partNumber * partSize, ++partNumber * partSize);
        array.push(parseInt(part, 2));

    } while (partNumber * partSize < bitsString.length)
    
    return new Uint8Array(array);
}

export function typedArrayToBitsString(buffer: Uint8Array): string {
    return Array.from(buffer).map(value => 
        value.toString(2).padStart(8, "0")
    ).join('');
}