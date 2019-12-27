const merge = require('webpack-merge'),
      path = require('path'),
      webpack = require('webpack');

const commonConfig = require('./webpack.common.js');

function rootDir(dir) {
    return path.resolve(__dirname, '..', dir);
}

module.exports = merge(commonConfig, {
    mode: 'development',

    plugins: [
        new webpack.DefinePlugin({
            RELEASE: JSON.stringify(false)
        })
    ],

    devServer: {
        compress: true,
        contentBase: rootDir('build/debug'),
        hot: true,
        overlay: {
            errors: true,
            warnings: true
        },
        port: 8080
    },

    // Recommended here:
    //   https://webpack.js.org/guides/build-performance/#devtool
    // See other options here:
    //   https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'cheap-module-eval-source-map',

    // Keep our build output to a minimum. See:
    //   https://webpack.js.org/configuration/stats
    stats: 'minimal',

    output: {
        filename: '[name].bundle.js',
        path: rootDir('build/debug')
    }
});
