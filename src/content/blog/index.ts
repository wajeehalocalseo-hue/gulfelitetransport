import type { Article } from "./types";
import { post as airport } from "./posts/riyadh-airport-taxi";
import { post as jeddah } from "./posts/riyadh-to-jeddah-options";
import { post as umrah } from "./posts/jeddah-airport-to-makkah-umrah";
import { post as fares } from "./posts/how-taxi-fares-work";
import { post as apps } from "./posts/taxi-vs-ride-hailing-long-trips";
import { post as trust } from "./posts/trustworthy-taxi-booking";
import { post as family } from "./posts/family-trips-transport-plan";
import { post as ramadan } from "./posts/ramadan-travel-rides";
import { post as freight } from "./posts/freight-riyadh-to-jeddah";
import { post as olaya } from "./posts/olaya-getting-a-car";

/** Every article written in the article format, in the order they were added. Add a new post by importing it here. */
export const articles: Article[] = [airport, jeddah, umrah, fares, apps, trust, family, ramadan, freight, olaya];
