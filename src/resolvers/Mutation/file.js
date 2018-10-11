const { processUpload } = require('../../lowdb');



const file = {
  singleUpload(parent, { file }, ctx, info) {
    return processUpload(file);
  },

  multipleUpload(parent, { files }, ctx, info) {
    return Promise.all(files.map(processUpload));
  },
};

module.exports = { file };
