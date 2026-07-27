"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', course_controller_1.CourseController.getAllCourses);
router.get('/:id', course_controller_1.CourseController.getCourseById);
router.post('/', auth_middleware_1.authMiddleware, course_controller_1.CourseController.createCourse);
router.post('/:id/enroll', auth_middleware_1.authMiddleware, course_controller_1.CourseController.enrollCourse);
router.put('/:id/progress', auth_middleware_1.authMiddleware, course_controller_1.CourseController.updateProgress);
exports.default = router;
//# sourceMappingURL=course.routes.js.map