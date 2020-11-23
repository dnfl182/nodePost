const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    mode: "development", 
    target: 'node',
    entry: "index.ts",
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
                exclude: /node_module/
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    devtool: "source-map"
}