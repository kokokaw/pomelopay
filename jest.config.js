module.exports = {
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    roots: ['<rootDir>'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
    testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/file-mock.js',
    },
    testResultsProcessor: './node_modules/jest-html-reporter',
    collectCoverage: true,
    coverageReporters: ["lcov"],
    coverageDirectory: "./coverage/",
    reporters: ["default", "./node_modules/jest-html-reporter"],
    modulePaths: [
        "<rootDir>"
    ],
}
