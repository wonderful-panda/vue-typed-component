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
        extensions: ["", ".ts", ".js"],
        root: __dirname,
        alias: {
            vue: "vue/dist/vue.js"
        }
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts" },
            { test: /\.json$/, loader: "json" },
        ],
        postLoaders: [
            { test: /test\.ts$/, loader: "webpack-espower" },
        ]
    },
};
