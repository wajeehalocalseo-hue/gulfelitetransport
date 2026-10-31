import type { ChildRecord } from "../subservices";
import { equipmentBatch2Micro, equipmentBatch2Sub } from "./equipment-batch-2";
import { fleetBatch3Contracts, fleetBatch3Micro, fleetBatch3Monthly, fleetBatch3Sub } from "./fleet-batch-3";
import { freightBatch1CommercialMicro, freightBatch1Micro, freightBatch1Sub } from "./freight-batch-1";
import { passengerBatch4Group, passengerBatch4Micro, passengerBatch4Sub } from "./passenger-batch-4";

/**
 * Register each new batch here. Level 2 records must come before Level 3 records so parents exist.
 * Every record listed is published unless held back in statusOverrides (see ../proposals.ts).
 */
export const batchSub: ChildRecord[] = [...freightBatch1Sub, ...equipmentBatch2Sub, ...fleetBatch3Sub, ...passengerBatch4Sub];
export const batchMicro: ChildRecord[] = [
  ...freightBatch1Micro,
  ...freightBatch1CommercialMicro,
  ...equipmentBatch2Micro,
  ...fleetBatch3Micro,
  ...fleetBatch3Monthly,
  ...fleetBatch3Contracts,
  ...passengerBatch4Micro,
  ...passengerBatch4Group,
];