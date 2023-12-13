import { randomUUID, randomBytes, randomFillSync } from 'node:crypto';

const UINT32_MAX = 0xffffffff;
const BUF_LEN = 1024;
const BUF_SIZE = BUF_LEN * Uint32Array.BYTES_PER_ELEMENT;
const randomPrefetcher = {
  buf: randomBytes(BUF_SIZE),
  pos: 0,
  next() {
    const { buf, pos } = this;
    let start = pos;
    if (start === buf.length) {
      start = 0;
      randomFillSync(buf);
    }
    const end = start + Uint32Array.BYTES_PER_ELEMENT;
    this.pos = end;
    return buf.subarray(start, end);
  },
};
export const cryptoRandom = (min: number, max: number) => {
  const buf = randomPrefetcher.next();
  const rnd = buf.readUInt32LE(0) / (UINT32_MAX + 1);
  if (min === undefined) return rnd;
  const [a, b] = max === undefined ? [0, min] : [min, max];
  return a + Math.floor(rnd * (b - a + 1));
};

export const random = (min: number, max: number) => {
  const rnd = Math.random();
  if (min === undefined) return rnd;
  const [a, b] = max === undefined ? [0, min] : [min, max];
  return a + Math.floor(rnd * (b - a + 1));
};

export const generateUUID = randomUUID;
