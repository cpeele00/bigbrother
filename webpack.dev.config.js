const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: './src/bigBrother.js',
    cache: true,
    devtool: 'source-map',
    watch: true,
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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({debug: true})
    ]
}