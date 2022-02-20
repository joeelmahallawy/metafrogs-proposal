import { web3 } from "../utils";
import crypto from "crypto";

const randomHash = (): string =>
  // @ts-expect-error
  web3.utils.bytesToHex(crypto.pseudoRandomBytes(32));
export default randomHash;
