"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authMiddleware, user_controller_1.UserController.getAllUsers);
router.get('/me/enrollments', auth_middleware_1.authMiddleware, user_controller_1.UserController.getMyEnrollments);
router.put('/me/profile', auth_middleware_1.authMiddleware, upload_middleware_1.upload.single('avatar'), user_controller_1.UserController.updateProfile);
router.put('/:id/role', auth_middleware_1.authMiddleware, user_controller_1.UserController.updateUserRole);
exports.default = router;
//# sourceMappingURL=user.routes.js.map