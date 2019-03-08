import Profile from '../models/profile';
import sanitizeHtml from 'sanitize-html';

export function createProfile(req, res) {
  if (!req.body.name) {
    return res.sendStatus(400);
  }

  const newProfile = new Profile(req.body);

  newProfile.title = sanitizeHtml(newProfile.title);
  if (newProfile.description) {
    newProfile.description = sanitizeHtml(newProfile.description);
  }

  newProfile.createdDate = new Date();
  newProfile.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    req.session.profileId = saved._id;
    return res.status(201).json(saved);
  });
}

export function getProfileById(req, res) {
  console.log('getProfileById', req.params.cuid);
  Profile.findById(req.params.cuid).select('name description').exec((err, profile) => {
    console.log('got profile', profile);
    if (err) {
      return res.status(500).send(err);
    }
    if (!profile) {
      return res.sendStatus(404);
    }
    return res.json(profile);
  });
}

export function getMe(req, res) {
  const meCuid = req.session.profileId;
  Profile.findById(meCuid).select('name description').exec((err, profile) => {
    if (err) {
      return res.status(500).send(err);
    }
    console.log('getMe', meCuid, profile);
    if (!profile) {
      return res.sendStatus(404);
    }
    return res.json(profile);
  });
}

export function updateMe(req, res) {
  const meCuid = req.session.profileId;
  updateProfile(meCuid, req.body).then((updatedProfile) => {
    res.json(updatedProfile);
  }).catch((err) => {
    console.log('what was error?', err);
    res.status(500).send(err);
  });
}

export function getProfiles(req, res) {
  let query;
  if (req.query.name) {
    query = Profile.find({ name: req.query.name });
  } else {
    query = Profile.find();
  }
  query.select('name description').exec((err, profiles) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!profiles) {
      return res.sendStatus(404);
    }
    return res.json(profiles);
  });
}

export function editProfile(req, res) {
  updateProfile(req.params.cuid, req.body).then((updatedProf) => {
    res.json(updatedProf);
  }).catch((err) => {
    res.status(500).send(err);
  });
}

function updateProfile(profileId, updated) {
  return new Promise((resolve, reject) => {
    Profile.findById(profileId).exec((err, profile) => {
      if (err) {
        reject(err);
      } else if (!profile) {
        reject();
      } else {
        profile.name = updated.name;
        profile.description = updated.description;
        profile.save((saveErr, saved) => {
          if (saveErr) {
            reject(saveErr);
          } else {
            Profile.findById(saved._id).select('name description').exec((updatedProfErr, updatedProf) => {
              if (updatedProfErr) {
                reject(updatedProfErr);
              } else {
                resolve(updatedProf);
              }
            });
          }
        });
      }
    });
  });
}

export function uploadPicture(req, res) {
  const bufferBody = req.body;
  Profile.findById(req.params.cuid).exec((err, profile) => {
    if (err) {
      return res.status(500).send(err);
    }
    profile.displayPic = bufferBody;
    profile.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.sendStatus(200);
    });
  });
}

export function getPicture(req, res) {
  Profile.findById(req.params.cuid).select('displayPic').exec((err, profile) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.contentType('jpeg').send(profile.displayPic);
  });
}
