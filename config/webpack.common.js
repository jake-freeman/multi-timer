const path = require('path'),
      { CleanWebpackPlugin } = require('clean-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

function rootDir(dir) {
    return path.resolve(__dirname, '..', dir);
}

module.exports = {
    context: rootDir('src'),

    entry: {
        main: './index.js'
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [ '**/*' ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: [ 'main' ],
            title: '',
            meta: { viewport: 'initial-scale=1' }
        })
    ],

    module: {
        rules: [
            {
                test: /\.m?js$/,
                enforce: 'pre',  // Run this on the raw source, before other rules.
                exclude: [
                    // Add node_modules to exclude to save time, other excludes are
                    // covered in the .eslintignore file.
                    //
                    /node_modules/
                ],
                use: {
                    loader: 'eslint-loader',
                    options: {
                        // emitWarning: true,
                        configFile: rootDir('.eslintrc.js'),
                        cache: true
                    }
                }
            },
            {
                test: /\.m?js$/,
                exclude: [
                    /node_modules/
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        configFile: rootDir('config/babel.config.js'),
                        sourceMaps: true
                    }
                }
            },
            {
                test: /\.(gif|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[sha512:hash:base64:7].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        modules: [ rootDir('node_modules') ]
    }
};
