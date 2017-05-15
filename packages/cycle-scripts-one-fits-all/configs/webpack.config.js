const { createConfig, defineConstants, env, entryPoint, setOutput, sourceMaps, addPlugins } = require('@webpack-blocks/webpack2');
const devServer = require('@webpack-blocks/dev-server2');
const postcss = require('@webpack-blocks/postcss');
const sass = require('@webpack-blocks/sass');
const typescript = require('@webpack-blocks/typescript');
const tslint = require('@webpack-blocks/tslint');
const extractText = require('@webpack-blocks/extract-text2');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const fs = require('fs');

const appPath = (...names) => path.join(process.cwd(), ...names);

const customConfig = fs.existsSync(appPath('webpack.config.js')) ?
    require(appPath('webpack.config.js')) :
    {};

module.exports = createConfig([
    () => customConfig, //Include user config
    typescript({
        useCache: true,
        cacheDirectory: 'node_modules/.cache/at-loader'
    }),
    tslint(),
    sass(),
    extractText('[name].css', 'text/x-sass'),
    postcss([
        autoprefixer({ browsers: ['last 2 versions'] })
    ]),
    defineConstants({
        'process.env.NODE_ENV': process.env.NODE_ENV
    }),
    addPlugins([
        new HtmlWebpackPlugin({
            template: './index.ejs',
            inject: true,
            favicon: 'public/favicon.png',
            hash: true
        }),
        new webpack.ProvidePlugin({
            Snabbdom: 'snabbdom-pragma'
        })
    ]),
    env('development', [
        devServer(),
        sourceMaps()
    ]),
    env('production', [
        addPlugins([
            new CopyWebpackPlugin([{ from: 'public', to: '' }]),
            new webpack.optimize.UglifyJsPlugin()
        ])
    ])
])
