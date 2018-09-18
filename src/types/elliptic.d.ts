/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Friday, 7th September 2018 1:16:01 pm
 * @Email:  developer@xyfindables.com
 * @Filename: elliptic.d.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Monday, 17th September 2018 2:13:36 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

declare module 'elliptic' {
  type CurvePreset = 'secp256k1'
    | 'p192'
    | 'p224'
    | 'p256'
    | 'p384'
    | 'p521'
    | 'curve25519'
    | 'ed25519'
  ;

  class EllipticPoint {
    toBuffer(): Buffer
  }

  class EllipticPublicKey {
    x: EllipticPoint;
    y: EllipticPoint
  }

  class EllipticSignature {
    r: BN;
    s: BN;
  }

  class BN {
    toBuffer(): Buffer;
  }

  class EllipticKey {
    sign(message: Array<any> | Buffer | string): EllipticSignature;
    getPublic(): EllipticPublicKey
  }

  class EllipticCurve {
    constructor(preset: CurvePreset);
    genKeyPair(): EllipticKey;
    keyFromPublic(publicKey: string, type: 'hex'): EllipticKey;
  }

  export {
    EllipticCurve as ec
  }
}