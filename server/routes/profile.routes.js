import { Router } from 'express';
import * as ProfileController from '../controllers/profile.controller';
const router = new Router();


router.route('/profiles').get(ProfileController.getProfiles);

router.route('/my-profile').get(ProfileController.getMe);

router.route('/my-profile').put(ProfileController.updateMe);

router.route('/profiles/:cuid').get(ProfileController.getProfileById);

router.route('/profiles').post(ProfileController.createProfile);

router.route('/profiles/:cuid').put(ProfileController.editProfile);

router.route('/profiles/:cuid/display-pic').post(ProfileController.uploadPicture);

router.route('/profiles/:cuid/display-pic').get(ProfileController.getPicture);

export default router;
