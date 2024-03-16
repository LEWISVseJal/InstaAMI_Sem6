import express from "express";
import { UnFollowUser, deleteUser, followUser, getUserCount, getAdminCount, getAdminList, getUserRegistrationStats, getUserList, getUser, getAllUsers, updateUser } from "../Controllers/UserController.js";
// import { getAllUsers } from "../../client/src/api/UserRequest.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";
const router = express.Router();

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.get('/count', getUserCount)
router.get('/admincount', getAdminCount)
router.get('/stats', getUserRegistrationStats)
router.get('/userlist', getUserList)
router.get('/adminlist', getAdminList)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow',authMiddleWare, followUser)
router.put('/:id/unfollow',authMiddleWare, UnFollowUser)

export default router;