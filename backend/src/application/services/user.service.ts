import { UserRepository } from '../../domain/repositories/user.repository';
import { User, UserStatus } from '../../domain/entities/user.entity';

export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async getAllUsers(limit: number = 10, offset: number = 0): Promise<User[]> {
        return this.userRepository.findAll(limit, offset);
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User> {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new Error(`Email '${data.email}' is already registered`);
        }
        return this.userRepository.create(data);
    }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        return this.userRepository.update(id, data);
    }

    async deleteUser(id: string): Promise<void> {
        return this.userRepository.delete(id);
    }
}
