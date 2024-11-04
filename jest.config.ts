import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Changed this line
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@mui/(.*)": "<rootDir>/node_modules/@mui/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!@toolpad/)", // Ensure all toolpad modules are transformed
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx", ".js", ".jsx"], // Treat .js and .jsx files as ESM
};

export default config;
