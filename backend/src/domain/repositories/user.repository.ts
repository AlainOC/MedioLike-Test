import { User, UserStatus } from '../entities/user.entity';

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(limit: number, offset: number): Promise<User[]>;
    create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User>;
    update(id: string, user: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>; // Soft delete
}
