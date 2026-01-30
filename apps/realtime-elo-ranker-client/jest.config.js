module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  transform: { "^.+\\.(t|j)sx?$": "ts-jest" },
  testRegex: ".*\\.spec\\.ts$",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.(t|j)s"],
  coverageDirectory: "<rootDir>/coverage",
};
