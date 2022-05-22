module.exports = {
    ...require('./jest-common'),
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    collectCoverageFrom: ['app/**/*.{js,ts}'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
        '^.+\\.jsx?$': 'esbuild-jest',
    },
    coveragePathIgnorePatterns: [],
    coverageThreshold: null,
};
