var path = require("path");

module.exports = {
    context: __dirname,
    entry: "./test.ts",
    target: "node",
    output: {
        path: path.join(__dirname, ".dist"),
        filename: "build.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ["", ".ts", ".js"],
        root: __dirname,
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
