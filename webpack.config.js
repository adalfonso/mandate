const path = require("path");

module.exports = {
    entry: "./src/ts/app.ts",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/app.js"
    },

    resolve: {
        alias: { "@": path.resolve(__dirname, "src") },
        extensions: [".ts", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};
