import express from "express";
import auth from "../middleware/auth.js";
import { acceptRequest, createRequest, getRequests, rejectRequest, submitEquip } from "../controllers/requests.js";

// router.get('/search', getPostsBySearch);
// router.get('/', getposts);
// router.get('/:id', getPost);
// router.post('/', auth, createPost);
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
const router = express.Router();

router.get('/',getRequests);
router.post('/',auth,createRequest);
router.patch('/:id',auth,submitEquip);
router.patch("/:id/accept",auth, acceptRequest);
router.patch("/:id/reject",auth, rejectRequest);





export default router