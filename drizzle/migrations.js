// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_cool_vector.sql';
import m0001 from './0001_exotic_mandarin.sql';
import m0002 from './0002_fearless_invaders.sql';
import m0003 from './0003_tidy_lyja.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003
    }
  }
  