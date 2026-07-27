import { UserService } from './user.service';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User, UserStatus } from '../../domain/entities/user.entity';

describe('UserService Unit Test Suite', () => {
    let mockUserRepository: jest.Mocked<UserRepository>;
    let userService: UserService;

    beforeEach(() => {
        mockUserRepository = {
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        } as jest.Mocked<UserRepository>;

        userService = new UserService(mockUserRepository);
    });

    test('should fetch all users correctly', async () => {
        const fakeUsers: User[] = [{
            id: 'u1', email: 'test@ml.com', passwordHash: 'hash',
            status: UserStatus.ACTIVE, roleId: 'r1', createdAt: new Date(), updatedAt: new Date(),
            emailVerifiedAt: null, lastLoginAt: null, deletedAt: null
        }];
        mockUserRepository.findAll.mockResolvedValueOnce(fakeUsers);

        const result = await userService.getAllUsers();
        expect(result).toEqual(fakeUsers);
        expect(mockUserRepository.findAll).toHaveBeenCalledWith(10, 0);
    });

    test('should fail user creation if email already registered', async () => {
        mockUserRepository.findByEmail.mockResolvedValueOnce({
            id: 'x1', email: 'duplicate@ml.com', passwordHash: 'aaa',
            status: UserStatus.ACTIVE, roleId: '1', createdAt: new Date(), updatedAt: new Date(),
            emailVerifiedAt: null, lastLoginAt: null, deletedAt: null
        });

        await expect(userService.createUser({
            email: 'duplicate@ml.com', passwordHash: 'pwd', roleId: 'r1',
            status: UserStatus.ACTIVE, emailVerifiedAt: null, lastLoginAt: null
        }))
            .rejects
            .toThrow("Email 'duplicate@ml.com' is already registered");

        expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
});
