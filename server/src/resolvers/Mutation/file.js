const { processUpload } = require('../../lowdb');



const file = {
  async singleUpload(parent, { filename, file }, ctx, info) {
    return ctx.db.mutation.singleUpload(
      {
        data: {
          filename,
          file: await processUpload(file),
        },
      },
      info
    )
  },
};

module.exports = { file };
