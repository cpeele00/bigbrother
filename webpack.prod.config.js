const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: './src/bigBrother.js',
    cache: false,
    debug: false,
    devtool: 'cheap-module-source-map',
    watch: false,
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
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),

        // Eliminate duplicate packages when generating bundle
        new webpack.optimize.DedupePlugin(),    

        // Minify JS
        new webpack.optimize.UglifyJsPlugin({minimize: true, comments: false})
    ]
}