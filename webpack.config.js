const path = require("path");

module.exports = {
    entry: "./src/UILayer.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            }
        ]
    }
}
