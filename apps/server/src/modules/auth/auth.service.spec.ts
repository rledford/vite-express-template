import { UnauthorizedError } from '@/errors';
import { authService } from './auth.service';
import { UserClaims, UserRegistration } from './models';

describe('authService', () => {
  const mockClaims: UserClaims = {
    id: 1,
    username: 'mock'
  };

  const mockAuth: UserRegistration = {
    username: 'mock',
    password: 'mock'
  };

  const repositorySpy = {
    insert: vi.fn(),
    findByCredentials: vi.fn()
  };

  const service = authService({
    jwtSecret: 'test',
    repository: repositorySpy
  });

  describe('sign', () => {
    it('should sign claims and return a token', () => {
      expect(service.sign(mockClaims)).toEqual(expect.any(String));
    });
  });

  describe('verify', () => {
    it('should return claims for valid token', () => {
      const token = service.sign(mockClaims);
      expect(service.verify(token)).toStrictEqual(mockClaims);
    });

    it('should throw if token is invalid', () => {
      expect(() => service.verify('--invalid--')).toThrowError(
        UnauthorizedError
      );
    });
  });

  describe('register', () => {
    it('should insert user info into repository and return a token', async () => {
      vi.spyOn(repositorySpy, 'insert').mockResolvedValueOnce(mockClaims);

      await expect(service.register(mockAuth)).resolves.toEqual(
        expect.any(String)
      );

      expect(repositorySpy.insert).toHaveBeenCalled();
    });
  });

  describe('authenticate', () => {
    it('should find a user by credentials and return a token', async () => {
      vi.spyOn(repositorySpy, 'findByCredentials').mockResolvedValueOnce(
        mockClaims
      );

      await expect(service.authenticate(mockAuth)).resolves.toEqual(
        expect.any(String)
      );
    });

    it('should throw unauthorized if user not found', async () => {
      vi.spyOn(repositorySpy, 'findByCredentials').mockResolvedValueOnce(
        undefined
      );
      await expect(service.authenticate(mockAuth)).rejects.toThrowError(
        UnauthorizedError
      );
    });
  });
});
