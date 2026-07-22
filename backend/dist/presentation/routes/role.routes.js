"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const router = (0, express_1.Router)();
router.get('/', role_controller_1.RoleController.getAll);
router.get('/:id', role_controller_1.RoleController.getById);
router.post('/', role_controller_1.RoleController.create);
router.put('/:id', role_controller_1.RoleController.update);
router.delete('/:id', role_controller_1.RoleController.delete);
// Permisos en roles
router.get('/:id/permissions', role_controller_1.RoleController.getPermissions);
router.post('/:id/permissions', role_controller_1.RoleController.assignPermissions);
exports.default = router;
