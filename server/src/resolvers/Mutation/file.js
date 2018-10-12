const prisma = require('prisma-binding');

const {
  processUpload,
  processDeleteFile,
  processUpdateFile,
} = require('../../localImages');

const file = {
  // UPLOAD A FILE
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

  // DELETE A FILE
  async deleteFile(parent, { id, path }, ctx, info) {
    processDeleteFile(path);

    return ctx.db.mutation.deleteFile({
      where: {
        id,
      },
    });
  },

  // UPDATE A FILENAME
  async updateFile(parent, { id, path, filename }, ctx, info) {
    const newPath = await processUpdateFile(path, filename);

    return ctx.db.mutation.updateFile({
      where: {
        id,
      },
      data: {
        path: newPath,
        filename,
      },
    });
  },
};

module.exports = { file };
