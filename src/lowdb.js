const mkdirp = require('mkdirp');
const shortid = require('shortid');
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// create lowdb DB
const uploadDir = './uploads';
const lowdbDB = new lowdb(new FileSync('db.json'));

lowdbDB.defaults({ uploads: []}).write();

// push file to DB
const recordFile = file => (
  lowdbDB.get('uploads').push(file).last().write()
);

mkdirp.sync(uploadDir);

const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate()
  const path = `${uploadDir}/${id}-${filename}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject),
  )
}

const processUpload = async (upload) => {
  // get data from uploading file
  const { stream, filename, mimetype, encoding } = await upload;
  const { id, path } = await storeUpload({ stream, filename });

  // push it to our "DB" (storage ?)
  return recordFile({ id, filename, mimetype, encoding, path });
}

module.exports = { processUpload };