import type { ChildRecord } from "../subservices";
import { containerBatch5Delivery, containerBatch5Handling, containerBatch5Micro, containerBatch5Port, containerBatch5Sub } from "./container-batch-5";
import { distributionBatch7Other, distributionBatch7Retail, distributionBatch7Sub } from "./distribution-batch-7";
import { equipmentBatch2Micro, equipmentBatch2Sub } from "./equipment-batch-2";
import { expressBatch10Micro, expressBatch10Sub } from "./express-batch-10";
import { fleetBatch3Contracts, fleetBatch3Micro, fleetBatch3Monthly, fleetBatch3Sub } from "./fleet-batch-3";
import { freightBatch1CommercialMicro, freightBatch1Micro, freightBatch1Sub } from "./freight-batch-1";
import { internationalBatch6Customs, internationalBatch6Export, internationalBatch6Import, internationalBatch6Sub } from "./international-batch-6";
import { lastMileBatch8Micro, lastMileBatch8Sub } from "./last-mile-batch-8";
import { projectBatch9Micro, projectBatch9Sub } from "./project-batch-9";
import { refrigeratedBatch12Micro, refrigeratedBatch12Sub } from "./refrigerated-batch-12";
import { warehouseBatch11Micro, warehouseBatch11Sub } from "./warehouse-batch-11";
import { passengerBatch4Group, passengerBatch4Micro, passengerBatch4Sub } from "./passenger-batch-4";

/**
 * Register each new batch here. Level 2 records must come before Level 3 records so parents exist.
 * Every record listed is published unless held back in statusOverrides (see ../proposals.ts).
 */
export const batchSub: ChildRecord[] = [...freightBatch1Sub, ...equipmentBatch2Sub, ...fleetBatch3Sub, ...passengerBatch4Sub, ...containerBatch5Sub, ...internationalBatch6Sub, ...distributionBatch7Sub, ...lastMileBatch8Sub, ...projectBatch9Sub, ...expressBatch10Sub, ...warehouseBatch11Sub, ...refrigeratedBatch12Sub];
export const batchMicro: ChildRecord[] = [
  ...freightBatch1Micro,
  ...freightBatch1CommercialMicro,
  ...equipmentBatch2Micro,
  ...fleetBatch3Micro,
  ...fleetBatch3Monthly,
  ...fleetBatch3Contracts,
  ...passengerBatch4Micro,
  ...passengerBatch4Group,
  ...containerBatch5Micro,
  ...containerBatch5Port,
  ...containerBatch5Delivery,
  ...containerBatch5Handling,
  ...internationalBatch6Import,
  ...internationalBatch6Export,
  ...internationalBatch6Customs,
  ...distributionBatch7Retail,
  ...distributionBatch7Other,
  ...lastMileBatch8Micro,
  ...projectBatch9Micro,
  ...expressBatch10Micro,
  ...warehouseBatch11Micro,
  ...refrigeratedBatch12Micro,
];