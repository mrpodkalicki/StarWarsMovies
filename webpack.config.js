const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/UILayer.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "docs")
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template.html"
      })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
              test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                  }
                }
              ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: {
                  loader: 'file-loader',
                  options: {
                    name: "[name].[ext]",
                    outputPath: "imgs"
                  },
                },
            },
            {
              test: /\.mp4$/,
              use: {
                loader: 'file-loader',
                options: {
                  name: "[name].[ext]",
                  outputPath: "movie"
                },
              },
          }
        ]
    }
}