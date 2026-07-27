"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers(limit = 10, offset = 0) {
        return this.userRepository.findAll(limit, offset);
    }
    async getUserById(id) {
        return this.userRepository.findById(id);
    }
    async createUser(data) {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new Error(`Email '${data.email}' is already registered`);
        }
        return this.userRepository.create(data);
    }
    async updateUser(id, data) {
        return this.userRepository.update(id, data);
    }
    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
}
exports.UserService = UserService;
