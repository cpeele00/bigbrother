const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: './src/bigBrother.js',
    cache: false,
    devtool: 'cheap-module-source-map',
    watch: false,
    output: {
        path: path.resolve(__dirname, './release'),
        filename: "index.js"
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader' }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: false}),
        new UglifyJSPlugin({minimize: true, comments: false})
    ]
}