const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    mode: "development", 
    target: 'node',
    entry: "/src/index.ts",
    output: {
        path: path.resolve(__dirname, "bundle"),
        filename: "bundle.js"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    "ts-loader"
                ],
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    devtool: "source-map"
}