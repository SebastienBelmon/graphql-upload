const fs = require('fs');

const shortid = require('shortid');

const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate();
  const path = `images/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(fs.createWriteStream(path))
      .on('finish', () => resolve({ path }))
      .on('error', reject)
  );
};

const processUpload = async upload => {
  // get data from uploading file
  const { stream, filename, mimetype, encoding } = await upload;
  const { path } = await storeUpload({ stream, filename });

  // return the local path of the file
  return path;
};

const processDeleteFile = path => {
  fs.unlink(path, err => {
    if (err) throw err;
    console.log(`${path} à été supprimé`);
  });
};

const processUpdateFile = async (oldPath, newFilename) => {
  const newPath = await `images/${shortid.generate()}-${newFilename}`;

  fs.rename(oldPath, newPath, err => {
    if (err) throw err;
    console.log(`${oldPath} renommé en ${newPath}`);
  });

  return newPath;
};

module.exports = { processUpload, processDeleteFile, processUpdateFile };
