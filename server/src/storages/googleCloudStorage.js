// GOOGLE CLOUD STORAGE
// [START GOOGLE CLOUD STORAGE]
const { Storage } = require('@google-cloud/storage');

const CLOUD_PROJECT = process.env.REACT_APP_CLOUD_PROJECT; // process.env.REACT_APP_CLOUD_PROJECT;
const CLOUD_BUCKET = process.env.REACT_APP_CLOUD_BUCKET; // process.env.REACT_APP_CLOUD_BUCKET;

const storage = new Storage({
  projectId: CLOUD_PROJECT,
});
const bucket = storage.bucket(CLOUD_BUCKET);

// [START public_url]
const getPublicUrl = filename => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
};
// [END public_url]

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
// [START process upload to google cloud]
const sendUploadToGCS = async ({ stream, filename, mimetype }) => {
  const path = `images/${Date.now()}${filename}`;
  const file = bucket.file(path);

  return new Promise((resolve, reject) =>
    stream
      .pipe(
        file.createWriteStream({
          metadata: {
            contentType: mimetype,
          },
          resumable: false,
        })
      )
      .on('finish', () => resolve({ path: getPublicUrl(path) }))
      .on('error', reject)
  );
};

const processUploadGCS = async file => {
  // get data from uploading file
  const { stream, filename, mimetype, encoding } = await file;
  const { path } = await sendUploadToGCS({ stream, filename, mimetype });

  return path;
};

const processDeleteGCSFile = async path => {
  // search for the filename (including bucket's folder)
  const regex = /images\/(.*)/gm;
  const filename = regex.exec(path)[0];

  const file = await bucket.file(filename);

  file
    .delete()
    .then(() => {
      console.log(`${filename} a bien été supprimé du Storage`);
    })
    .catch(err => console.error(err));
};

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  processUploadGCS,
  processDeleteGCSFile,
};
