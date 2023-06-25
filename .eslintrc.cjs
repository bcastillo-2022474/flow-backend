module.exports = {
    env: {browser: true, es2020: true},
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        // "plugin:import/recommended",
        "prettier",
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
    settings: {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        },
    },
    rules: {
        "@typescript-eslint/no-empty-function": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ]
    }
}
