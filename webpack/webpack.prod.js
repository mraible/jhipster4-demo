const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Visualizer = require('webpack-visualizer-plugin');
const ngcWebpack = require('ngc-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'production';
const extractSASS = new ExtractTextPlugin(`[name]-sass.[hash].css`);
const extractCSS = new ExtractTextPlugin(`[name].[hash].css`);

module.exports = webpackMerge(commonConfig({ env: ENV }), {
    // Enable source maps. Please note that this will slow down the build.
    // You have to enable it in UglifyJSPlugin config below and in tsconfig-aot.json as well
    // devtool: 'source-map',
    entry: {
        polyfills: './src/main/webapp/app/polyfills',
        global: './src/main/webapp/content/scss/global.scss',
        main: './src/main/webapp/app/app.main-aot'
    },
    output: {
        path: utils.root('target/www'),
        filename: 'app/[name].[hash].bundle.js',
        chunkFilename: 'app/[id].[hash].chunk.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [
                {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'tsconfig-aot.json'
                    },
                },
                { loader: 'angular2-template-loader' }
            ],
            exclude: ['node_modules/generator-jhipster']
        },
        {
            test: /\.ts$/,
            use: [
                {
                    loader: 'ngc-webpack',
                    options: {
                        disable: false,
                        tsConfigPath: 'tsconfig-aot.json'
                    }
                }
            ],
            exclude: /(polyfills\.ts|vendor\.ts|Reflect\.ts)/
        },
        {
            test: /\.scss$/,
            loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
            exclude: /(vendor\.scss|global\.scss)/
        },
        {
            test: /(vendor\.scss|global\.scss)/,
            use: extractSASS.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            })
        },
        {
            test: /\.css$/,
            loaders: ['to-string-loader', 'css-loader'],
            exclude: /(vendor\.css|global\.css)/
        },
        {
            test: /(vendor\.css|global\.css)/,
            use: extractCSS.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }]
    },
    plugins: [
        extractSASS,
        extractCSS,
        new Visualizer({
            // Webpack statistics in target folder
            filename: '../stats.html'
        }),
        new UglifyJSPlugin({
            parallel: true,
            uglifyOptions: {
                ie8: false,
                // sourceMap: true, // Enable source maps. Please note that this will slow down the build
                compress: {
                    dead_code: true,
                    warnings: false,
                    properties: true,
                    drop_debugger: true,
                    conditionals: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    toplevel: true,
                    if_return: true,
                    inline: true,
                    join_vars: true
                },
                output: {
                    comments: false,
                    beautify: false,
                    indent_level: 2
                }
            }
        }),
        new ngcWebpack.NgcWebpackPlugin({
            disabled: false,
            tsConfig: utils.root('tsconfig-aot.json'),
            resourceOverride: ''
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ]
});
