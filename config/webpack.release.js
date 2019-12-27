const merge = require('webpack-merge'),
      path = require('path'),
      webpack = require('webpack');

const commonConfig = require('./webpack.common.js');

function rootDir(dir) {
    return path.resolve(__dirname, '..', dir);
}

module.exports = merge(commonConfig, {
    mode: 'production',

    plugins: [
        new webpack.DefinePlugin({
            RELEASE: JSON.stringify(true)
        })
    ],

    // This will generate source maps that we can deploy with our
    // packages, and that don't have the source code embedded.
    //
    // See: https://webpack.js.org/configuration/devtool/#production
    devtool: 'nosources-source-map',

    output: {
        filename: '[name].[contenthash:7].bundle.js',
        path: rootDir('build/release')
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true
            })
        ]
    }
});