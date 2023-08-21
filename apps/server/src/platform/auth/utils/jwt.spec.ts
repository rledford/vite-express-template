import { jwtPair, jwtSigner } from './jwt';

describe('jwt', () => {
  describe('jwtSigner', () => {
    it('should return a JWT sign function', () => {
      const sign = jwtSigner({ secret: 'test' });
      expect(typeof sign).toEqual('function');
    });
  });

  describe('jwtVerifier', () => {
    it('should return a JWT verify function', () => {
      const verify = jwtSigner({ secret: 'test' });
      expect(typeof verify).toEqual('function');
    });
  });

  describe('jwtPair', () => {
    it('should return a JWT sign and verify function pair', () => {
      const { sign, verify } = jwtPair({ secret: 'test' });
      expect(typeof sign).toEqual('function');
      expect(typeof verify).toEqual('function');
    });
  });
});
