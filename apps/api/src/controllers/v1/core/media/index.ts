import getSingle from './data/get-single';
import getMultiple from './data/get-multiple';
import deleteMedia from './data/delete';
import updateSingle from './data/update-single';
import uploadSingle from './data/upload-single';
import streamMedia from './data/stream-media';

export default {
    getSingle,
    getMultiple,
    delete: deleteMedia,
    updateSingle,
    uploadSingle,
    streamMedia,
};
