// GOOGLE CLOUD STORAGE
// [START GOOGLE CLOUD STORAGE]
const Multer = require('multer');
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
  const path = Date.now() + filename;
  const file = bucket.file(path);

  return new Promise((resolve, reject) => (
    stream
      .pipe(file.createWriteStream({
        metadata: {
          contentType: mimetype,
        },
        resumable: false,
      }))
      .on('finish', () => resolve({ path: getPublicUrl(path) }))
      .on('error', reject)
  ));
};

const processUploadGCS = async (file) => {
  // get data from uploading file
  const { stream, filename, mimetype, encoding } = await file;
  const { path } = await sendUploadToGCS({ stream, filename, mimetype });

  return path;
}

// const sendUploadToGCS = (req, res, next) => {
//   if (!req.file) {
//     return next();
//   }

//   const gcsname = Date.now() + req.file.originalname;
//   const file = bucket.file(gcsname);

//   const stream = file.createWriteStream({
//     metadata: {
//       contentType: req.file.mimetype,
//     },
//     resumable: false,
//   });

//   stream.on('error', err => {
//     req.file.cloudStorageError = err;
//     next(err);
//   });

//   stream.on('finish', () => {
//     req.file.cloudStorageObject = gcsname;
//     file.makePublic().then(() => {
//       req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
//       next();
//     });
//   });

//   stream.end(req.file.buffer);
// };
// [END process upload to google cloud]

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
// [START multer]
const multer = Multer({
  storage: Multer.memoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // <= 10mb
  },
});
// [END multer]

// [START add]
// router.post(
//   '/add',
//   multer.single('image'),
//   sendUploadToGCS,
//   (req, res, next) => {
//     let data = req.body;

//     // Was an image uploaded? If so, we'll use its public URL
//     // in cloud storage.
//     if (req.file && req.file.cloudStoragePublicUrl) {
//       data.imageUrl = req.file.cloudStoragePublicUrl;
//     }

// // Save the data to the database.
// getModel().create(data, (err, savedData) => {
//   if (err) {
//     next(err);
//     return;
//   }
//   res.redirect(`${req.baseUrl}/${savedData.id}`);
// });
//   }
// );
// // [END add]

// [END GOOGLE CLOUD STORAGE]

module.exports = { getPublicUrl, multer, sendUploadToGCS, processUploadGCS };
