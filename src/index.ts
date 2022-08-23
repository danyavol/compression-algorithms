import { readFileSync, writeFileSync } from 'fs';
import { huffmanEncode, huffmanDecode } from './huffman-code';
import { bitsStringToTypedArray, typedArrayToBitsString } from './utils/bits';

////////////////////////////////////////////////////////////

// Read example text
const rawText = readFileSync('input/example-raw.txt', { encoding: 'utf-8' });

// Encode
const encodedText = huffmanEncode(rawText);

// Save encoded
const bufferView = bitsStringToTypedArray(encodedText);
writeFileSync('output/example-encoded.binary', bufferView, { encoding: 'binary' });

// Read encoded
const buffer = readFileSync('output/example-encoded.binary');
const bitsString = typedArrayToBitsString(new Uint8Array(buffer));

// Decode
const decoded = huffmanDecode(bitsString);

// Save decoded
writeFileSync('output/example-decoded.txt', decoded);