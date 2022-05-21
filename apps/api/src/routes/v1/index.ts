// developer
import developerLibrary from './developer/library';
import developerSetting from './developer/setting';
// core
import coreAuthentication from './core/authentication';
import coreUser from './core/user';
// cms

export default {
  developer: {
    library: developerLibrary,
    setting: developerSetting,
  },
  core: {
    authentication: coreAuthentication,
    user: coreUser,
  },
  cms: {},
};
