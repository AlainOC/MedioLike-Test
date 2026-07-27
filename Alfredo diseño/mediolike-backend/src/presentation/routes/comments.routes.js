"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_controller_1 = require("../controllers/comments.controller");
const router = (0, express_1.Router)();
router.get('/course/:courseId', comments_controller_1.getCommentsByCourse);
router.post('/', comments_controller_1.createComment);
exports.default = router;
//# sourceMappingURL=comments.routes.js.map