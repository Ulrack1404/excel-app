/* eslint-disable */
module.exports = {
    // parser: "@babel/eslint-parser",
    // parser: "babel-eslint",
    parserOptions: {
        babelOptions: {
            configFile: "./babel.config.json"
        },
        sourceType: "module",
        ecmaVersion: 2022
    },
    env: {
        browser: true,
        node: true,
        es6: true
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
                avoidEscape: true
            }
        ],
        "linebreak-style": ["error", "windows"],
        "eslintquote-props": ["off", "as-needed"],
        "object-curly-spacing": ["error", "always"],
        "require-jsdoc": "off",
        "no-trailing-spaces": "off",
        "space-before-blocks": "off",
        "no-unused-vars": "off",
        "operator-linebreak": "off",
        "comma-dangle": "off",
        "space-before-function-paren": "off"
    }
};
