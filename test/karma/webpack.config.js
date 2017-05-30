var path = require("path");

module.exports = {
    context: __dirname,
    entry: "./test.ts",
    output: {
        path: path.join(__dirname, ".dist"),
        filename: "build.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".ts", ".js"],
        modules: [__dirname, "node_modules"],
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    module: {
        loaders: [
            { test: /\.ts$/, use: ["webpack-espower-loader", "ts-loader"] }
        ]
    },
};
