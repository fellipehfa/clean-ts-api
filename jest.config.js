module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/presentation/protocols/index.ts',
    '!<rootDir>/src/data/usecases/add-account/db-add-account-protocols.ts',
    '!<rootDir>/src/presentation/controllers/signup/signup-protocols.ts',
    '!<rootDir>/src/presentation/controllers/login/login-protocols.ts',
    '!<rootDir>/src/presentation/helper/validator/required-field-validation.ts',
    '!<rootDir>/src/presentation/helper/validator/validation-composite.ts',
    '!<rootDir>/src/presentation/helper/validator/email-validation.ts',
    '!<rootDir>/src/presentation/helper/validator/compare-field-validation.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
