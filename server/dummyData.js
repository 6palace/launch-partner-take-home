import Profile from './models/profile';
import * as fs from 'fs';

let duckImage;

fs.readFile('./server/duck.jpg', (err, data) => {
  if (err) throw err;
  duckImage = data;
});

export default function () {
  Profile.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const profile1 = new Profile({ name: 'name1', description: 'description1', displayPic: duckImage });
    const profile2 = new Profile({ name: 'name2', description: 'description1' });

    Profile.create([profile1, profile2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
