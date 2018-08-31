/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Thursday, 30th August 2018 1:18:58 pm
 * @Email:  developer@xyfindables.com
 * @Filename: xyo-signature-set.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Friday, 31st August 2018 3:00:17 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XyoMultiTypeArrayBase } from './xyo-multi-type-array-base';
import { XyoArrayCreator } from '../xyo-array-base';
import { XyoResult } from '../../xyo-result';
import { XyoArrayUnpacker } from '../xyo-array-unpacker';
import { XyoObject } from '../../xyo-object';

class XyoSignatureSetCreator extends XyoArrayCreator {

  get major () {
    return 0x02;
  }

  get minor () {
    return 0x03;
  }

  get sizeOfBytesToGetSize () {
    return XyoResult.withValue(2);
  }

  public readSize(buffer: Buffer) {
    return XyoResult.withValue(buffer.readUInt16BE(0));
  }

  public createFromPacked(buffer: Buffer) {
    const unpackedArray = new XyoArrayUnpacker(buffer, false, 2);
    const unpackedArrayObject = new XyoSignatureSet(unpackedArray.array);
    return XyoResult.withValue(unpackedArrayObject);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class XyoSignatureSet extends XyoMultiTypeArrayBase {

  public static creator = new XyoSignatureSetCreator();

  constructor (public readonly array: XyoObject[]) {
    super();
  }

  get id () {
    return XyoSignatureSet.creator.id;
  }

  get sizeIdentifierSize () {
    return XyoSignatureSet.creator.sizeOfBytesToGetSize;
  }
}
