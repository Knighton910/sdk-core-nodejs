/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Monday, 10th September 2018 4:29:55 pm
 * @Email:  developer@xyfindables.com
 * @Filename: origin-chain-manager.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Monday, 17th September 2018 5:09:51 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XYOStorageProvider, XyoStorageProviderPriority } from '../../storage/xyo-storage-provider';
import { XyoBoundWitness } from '../../components/bound-witness/xyo-bound-witness';
import { XyoError } from '../../components/xyo-error';
import { XyoOriginBlock } from './xyo-origin-block';
import { XyoHashProvider } from '../../hash-provider/xyo-hash-provider';
import { XyoPacker } from '../../xyo-packer/xyo-packer';

/**
 * An XyoOriginChainNavigator exposes an api for managing
 * an origin chain
 */
export class XyoOriginChainNavigator {

  /**
   * Creates an instance of a XyoOriginChainNavigator
   *
   * @param xyoPacker a packer for serializing / deserializing values
   * @param storageProvider A storage provider for storage management
   * @param hashingProvider A hashing provider for providing basic hash functionality
   *                        used in blockchain like ways
   */

  constructor(
    private readonly xyoPacker: XyoPacker,
    private readonly storageProvider: XYOStorageProvider,
    private readonly hashingProvider: XyoHashProvider,
  ) {}

  /**
   * Removes an origin block from storage if it exists
   *
   * @param originBlockHash The hash of the origin block to remove
   */

  public removeOriginBlock(originBlockHash: Buffer) {
    return this.storageProvider.delete(originBlockHash);
  }

  /**
   * Returns true if the block exists in storage corresponding to the hash, false otherwise
   * @param originBlockHash The hash of the block to query
   */

  public containsOriginBlock (originBlockHash: Buffer) {
    return this.storageProvider.containsKey(originBlockHash);
  }

  /**
   * Returns a list of all of origin blocks in the system
   */
  public getAllOriginBlockHashes() {
    return this.storageProvider.getAllKeys();
  }

  /**
   * Adds a bound-witness, which is an origin block, to storage. Additionally it updates
   * any indexes that need to be updated
   */

  public async addBoundWitness(originBlock: XyoBoundWitness): Promise<XyoError | undefined> {
    const blockDataValue = this.xyoPacker.serialize(originBlock, originBlock.id[0], originBlock.id[1], false);
    const blockHash = await originBlock.getHash(this.hashingProvider);
    const blockHashValue = this.xyoPacker.serialize(blockHash, blockHash.id[0], blockHash.id[1], true);

    const previousHashesValue = await new XyoOriginBlock(this.xyoPacker, originBlock).findPreviousBlocks();
    const promises = previousHashesValue.map((hash) => {
      if (!hash) {
        return;
      }

      const mergedHashed = Buffer.concat([Buffer.from([0xFF]), hash]);

      return this.storageProvider.write(
        mergedHashed,
        blockHashValue,
        XyoStorageProviderPriority.PRIORITY_MED,
        true,
        60000
      );
    });

    await Promise.all(promises);

    return this.storageProvider.write(
      blockHashValue,
      blockDataValue,
      XyoStorageProviderPriority.PRIORITY_MED,
      true,
      60000
    );
  }
}
