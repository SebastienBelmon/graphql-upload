const shortid = require('shortid');

const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate()
  const path = `${uploadDir}/${id}-${filename}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ path }))
      .on('error', reject),
  )
}

const processUpload = async (upload) => {
  // get data from uploading file
  const { stream, filename, mimetype, encoding } = await upload;
  const { path } = await storeUpload({ stream, filename });

  // push it to our "DB" (storage ?)
  return path;
}

module.exports = { processUpload };