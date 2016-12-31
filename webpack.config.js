var path = require("path");

module.exports = {
    context: path.join(__dirname, "src"),
    entry: "./index.ts",
    output: {
        library: "vue-typed-component",
        libraryTarget: "umd",
        path: path.join(__dirname, "dist"),
        filename: "index.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ["", ".ts"],
        root: path.join(__dirname, "src")
    },
    module: {
        loaders: [
          { test: /\.ts$/, loader: "ts", exclude: /node_modules/ },
        ]
    },
    externals: [
        "vue",
        "vue-class-component"
    ]
};
