const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: './src/bigBrother.js',
    cache: true,
    debug: true,
    devtool: 'source-map',
    watch: true,
    output: {
        path: path.resolve(__dirname, './release'),
        filename: "index.js"
    },
    module: {
        loaders: [
            { 
                test: /\.(js|jsx)$/, 
                loader: 'babel',
                include: [
                    path.join(__dirname, 'src') // important for performance
                ],
                query: {
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
}