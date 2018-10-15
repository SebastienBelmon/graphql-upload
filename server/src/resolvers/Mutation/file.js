const promisesAll = require('promises-all');

const {
  processUpload,
  processDeleteFile,
  processUpdateFile,
} = require('../../storages/localStorage');

const {
  // getPublicUrl,
  processUploadGCS,
  processDeleteGCSFile,
  processUpdateGCSFile,
} = require('../../storages/googleCloudStorage');

const file = {
  // UPLOAD A FILE
  async singleUpload(parent, { filename, file }, ctx, info) {
    // await processUpload(file);

    return ctx.db.mutation.createFile(
      {
        data: {
          filename,
          path: await processUploadGCS(file),
        },
      },
      info
    );
  },

  // MULTIPLE UPLOAD
  async multipleUpload(parent, { names, files }, ctx, info) {
    // resolve will get all files pathnames as an array
    // const { resolve, reject } = await promisesAll.all(files.map(processUpload));

    const { resolve, reject } = await promisesAll.all(files.map(processUploadGCS));

    if (reject.length) {
      reject.forEach(({ name, message }) =>
        console.error(`${name}: ${message}`)
      );
    }

    console.log(names);
    console.log(resolve);

    files.map((file, i) => {
      ctx.db.mutation.createFile({
        data: {
          filename: names[i],
          path: resolve[i],
        },
      });
    });
  },

  // DELETE A FILE
  async deleteFile(parent, { id, path }, ctx, info) {
    // processDeleteFile(path);

    processDeleteGCSFile(path);

    return ctx.db.mutation.deleteFile({
      where: {
        id,
      },
    });
  },

  // UPDATE A FILENAME
  async updateFile(parent, { id, path, filename }, ctx, info) {
    // const newPath = await processUpdateFile(path, filename);
    const newPath = await processUpdateGCSFile(path, filename);

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
