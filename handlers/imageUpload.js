/* 
  image upload handler
*/

// dependencies
const fs = require('fs');
const rootPath = `${process.cwd()}/image`;

// function to check path exists
async function checkFileOrFolderExists(str) {
  try {
    await fs.statSync(str);
    return true;
  } catch (error) {
    return false;
  }
}

async function imageUpload(req, res, next) {
  // check if there is a file in the request if there is no file do not continue
  if (!req.files.hasOwnProperty('image')) return;

  //  get the file extension
  const type = req.files.image.type.split('/').pop();

  //  set the root save location based on the users id
  const saveLocation = `${rootPath}/${this.user._id}`;

  // set a dynamic file name to avoid issues with frontend caching
  const fileName = `${Date.now()}.${type}`;

  // temp location that formidable put the file taht was sent in request
  const tempLocation = req.files.image.path;

  // check if the folder exists
  const location = await checkFileOrFolderExists(saveLocation);

  // create folder for user if it does not exist
  if (!location) fs.mkdirSync(saveLocation);

  // creates new copy of the file in specified path
  fs.copyFileSync(tempLocation, `${saveLocation}/${fileName}`);

  // removed temp file put in cache
  fs.unlinkSync(tempLocation);
  // if old file name was provided remove it
  if (req.fields.old) fs.unlinkSync(`${saveLocation}/${req.fields.old}`);
  // return the location that the file was saved
  return `${this.id}/${fileName}`;
}
module.exports = imageUpload;
