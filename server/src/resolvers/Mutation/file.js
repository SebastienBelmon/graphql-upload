const { processUpload } = require('../../localImages');

const file = {
  async singleUpload(parent, { filename, file }, ctx, info) {
    return ctx.db.mutation.createFile(
      {
        data: {
          filename,
          path: await processUpload(file),
        },
      },
      info
    );
  },
};

module.exports = { file };
