const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.MIX_ENV || 'dev';

const publicPath = 'http://localhost:4001/';
const hot = 'webpack-hot-middleware/client?path=' + publicPath + '__webpack_hmr';

const PATHS = {
    src: path.join(__dirname, 'web/static'),
    style: path.join(__dirname, 'web/static', 'index.css'),
    dest: path.join(__dirname, 'priv/static'),
};

const common = {
    output: {
        path: path.join(PATHS.dest),
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel?cacheDirectory'],
            include: PATHS.src
        }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin()        
    ]
};

const clean = path => {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                root: process.cwd()
            })
        ]
    };
};

const setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);
    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
};

const uglifyJS = () => {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
};

const setupCSS = paths => {
    return {
        module: {
            loaders: [{
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: paths
            }]
        }
    };
};

const extractCSS = paths => {
    return {
        module: {
            loaders: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css'),
                include: paths
            }]
        },
        plugins: [
            new ExtractTextPlugin('css/[name].css')
        ]
    };
};


let config;

switch (env) {
    case 'prod':
        config = merge(
            common,
            {
                entry: {
                    style: PATHS.style,
                    app: [ 'babel-polyfill', PATHS.src ]
                }
            },
            clean(PATHS.dest),
            setFreeVariable('process.env.NODE_ENV', 'production'),
            uglifyJS(),
            extractCSS(PATHS.style)
        );
        break;
    default:
        config = merge(
            common,
            {
                entry: {
                    style: PATHS.style,
                    app: [ 'babel-polyfill', hot, PATHS.src ],
                },
                output: {
                    publicPath: publicPath
                },
                devtool: 'eval-source-map',
                plugins: [
                    new webpack.HotModuleReplacementPlugin()
                ]
            },
            setupCSS(PATHS.style)
        );
}

module.exports = validate(config);
