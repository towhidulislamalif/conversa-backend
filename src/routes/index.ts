import express from 'express';
import userRoute from './user.route';

const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: userRoute,
  },
  // Add more routes as needed
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
