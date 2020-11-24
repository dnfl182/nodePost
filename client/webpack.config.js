const path = require('path');
module.exports = {
    mode: "development", 
    target: 'web',
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "../server/public/bundle"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [ "ts-loader" ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
    },
    devtool: "source-map"
}