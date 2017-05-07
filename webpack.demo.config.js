const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: ['babel-polyfill', path.join(__dirname, "./examples/react", "index.js")],
    cache: true,
    debug: true,
    devtool: 'source-map',
    watch: true,
    output: {
        path: path.resolve(__dirname, './examples/release'),
        filename: "index.js"
    },
    relativeUrls: true,
    module: {
        loaders: [
            { 
                test: /\.(js|jsx)$/, 
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // Custom Plugin that tells React to build in dev mode
        // Best practice.
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('development'),
            __DEV__: true
          }
        }),

        new webpack.NoErrorsPlugin()
    ]
}