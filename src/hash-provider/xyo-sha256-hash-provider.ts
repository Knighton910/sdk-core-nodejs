/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Tuesday, 18th September 2018 10:59:12 am
 * @Email:  developer@xyfindables.com
 * @Filename: xyo-sha-256-hash-provider.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Tuesday, 18th September 2018 11:09:16 am
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XyoSha256Hash } from '../components/hashing/xyo-sha256-hash';
import { XyoNativeBaseHashProvider } from './xyo-native-base-hash-provider';

/**
 * Provides sha256 hash support
 */

export class XyoSha256HashProvider extends XyoNativeBaseHashProvider {

  /**
   * Creates a new instance of a XyoSha256HashProvider
   */

  constructor() {
    super('sha256', XyoSha256Hash);
  }
}
