module.exports = {
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/file-mock.js',
    },
    testMatch: [
        "**/*.test.+(ts|tsx|js|jsx)"
    ],
    testEnvironment: 'jsdom',
    testResultsProcessor: './node_modules/jest-html-reporter',
    collectCoverage: true,
    coverageReporters: ["lcov"],
    coverageDirectory: "./coverage/",
    reporters: ["default", "./node_modules/jest-html-reporter"],
}
