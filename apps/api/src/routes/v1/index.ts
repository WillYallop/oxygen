// developer
import developerLibrary from './developer/library';
import developerSetting from './developer/setting';
import developerVersion from './developer/version';
// core
import coreAuthentication from './core/authentication';
import coreUser from './core/user';
import coreCdn from './core/cdn';
// cms

export default {
    developer: {
        library: developerLibrary,
        setting: developerSetting,
        version: developerVersion,
    },
    core: {
        authentication: coreAuthentication,
        user: coreUser,
        cdn: coreCdn,
    },
    cms: {},
};
