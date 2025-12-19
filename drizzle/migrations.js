// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import m0000 from "./0000_material_captain_flint.sql";
import m0001 from "./0001_flimsy_maddog.sql";
import journal from "./meta/_journal.json";

export default {
  journal,
  migrations: {
    "0000_material_captain_flint": m0000,
    "0001_flimsy_maddog": m0001,
  },
};
