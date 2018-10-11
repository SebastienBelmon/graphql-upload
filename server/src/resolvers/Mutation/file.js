const prisma = require('prisma-binding');

const { processUpload } = require('../../localImages');

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

  // TODO !
  //? Idée : On trouve le fichier sur le serve avec 'fs', et on le supprime
  //? puis on supprime également le node graphql
  //* créer une fonction processDeleteFile
  // A MODIFIER
  deleteFile: prisma.forwardTo('db'),

  // TODO !
  //? Idée : On trouve le fichier sur le serve avec 'fs', et on le renomme
  //? puis on renomme également le node graphql
  //* créer une fonction processUpdateFile
  // UPDATE A FILE NAME
  async updateFile(parent, { where, filename }, ctx, info) {
    return ctx.db.mutation.updateFile({
      where,
      data: {
        filename,
      }
    })
  },
};

module.exports = { file };
