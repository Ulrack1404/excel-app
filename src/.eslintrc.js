/* eslint-disable */
module.exports = {
    // parser: "@babel/eslint-parser",
    // parser: "babel-eslint",
    parserOptions: {
        babelOptions: {
            configFile: "./babel.config.json",
        },
        sourceType: "module",
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: "google",
    rules: {
        indent: ["off", 4],
        semi: [1, "always"],
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
                avoidEscape: true,
            },
        ],
        "linebreak-style": ["error", "windows"],
        "eslintquote-props": ["off", "as-needed"],
    },
};
