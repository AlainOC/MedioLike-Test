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
        // En una app real, aquí encriptaríamos el password_hash con bcrypt!
        // Ejemplo mockeado: data.passwordHash = await bcrypt.hash(data.passwordHash, 10);
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
