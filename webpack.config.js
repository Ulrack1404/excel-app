const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env, argv) => {
    const isProd = argv.mode === "production";
    const isDev = !isProd;

    const filename = (ext) =>
        isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

    console.log("filename:", filename);
    const plugins = () => {
        const base = [
            new HtmlWebpackPlugin({
                template: "./index.html",
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "src", "favicon.ico"),
                        to: path.resolve(__dirname, "dist"),
                    },
                ],
            }),
            new MiniCssExtractPlugin({
                filename: filename("css"),
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(argv.mode),
            }),
        ];

        if (isDev) {
            base.push(new ESLintPlugin());
        }

        return base;
    };

    return {
        target: "web",
        context: path.resolve(__dirname, "src"),
        entry: {
            main: [
                "core-js/stable",
                "regenerator-runtime/runtime",
                "./index.js",
            ],
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: filename("js"),
            clean: true,
        },
        resolve: {
            extensions: [".js"], // позволяет не указывать расширения файлов при импорте
            alias: {
                "@": path.resolve(__dirname, "src"), // символ @ будет перенаправлять в папку src
                "@core": path.resolve(__dirname, "src", "core"),
            },
        },
        devServer: {
            port: 3000,
            open: true,
            hot: true,
            watchFiles: path.resolve(__dirname, "src"),
            client: { reconnect: true },
            liveReload: true,
            static: {
                directory: path.resolve(__dirname, "src"),
            },
            historyApiFallback: true,
        },
        devtool: isDev ? "source-map" : false,
        plugins: plugins(),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                },
            ],
        },
    };
};
