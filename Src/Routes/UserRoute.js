const express = require("express");
const { validateBody } = require("../Middleware/Validation");
const { createUserSchema, loginSchema } = require("../Validations/userValidation");
const {
    getUsers,
    addUser ,
    getUserById,
    updateUser ,
    deleteUser ,
    loginUser ,
    updateUserLogin,
    updateUserStatus // Import the new function
} = require("../Controllers/UserController");
const upload = require("../Middleware/upload");

const router = express.Router();

router.get("/", getUsers);
router.post("/", upload.single("image"), validateBody(createUserSchema), addUser );
router.put("/:id", upload.single('image'), updateUser );
router.put("/:id/etat", updateUserStatus);
router.put("/:id/etat", updateUserStatus);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser );
router.post("/login", validateBody(loginSchema), loginUser );

module.exports = router;