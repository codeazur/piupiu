const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');
const env = process.env.MIX_ENV || 'dev';

const PATHS = {
    src: path.join(__dirname, 'web/static'),
    dest: path.join(__dirname, 'priv/static'),
};

const common = {
    output: {
        path: PATHS.dest,
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
                root: process.cwd(),
                verbose: false
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
                test: /\.s?css$/,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
                include: paths
            }]
        },
        sassLoader: {
            includePaths: [path.join(PATHS.src, 'scss')]
        }
    };
};

const extractCSS = paths => {
    return {
        module: {
            loaders: [{
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass', { publicPath: '../' }),
                include: paths
            }]
        },
        plugins: [
            new ExtractTextPlugin('css/[name].css')
        ],
        sassLoader: {
            includePaths: [path.join(PATHS.src, 'scss')]
        }
    };
};


let config;

switch (env) {

    case 'prod':
        config = merge(
            common,
            {
                entry: {
                    app: ['babel-polyfill', PATHS.src],
                    vendor: Object.keys(pkg.dependencies)
                },
                module: {
                    loaders: [{
                        test: /\.(png|jpe?g|gif|svg)$/,
                        loaders: [
                            'file?context=' + PATHS.src + '&name=[path][name].[ext]',
                            'image-webpack'
                        ]
                    }]
                },
                imageWebpackLoader: {
                    mozjpeg: {
                        quality: 75
                    },
                    pngquant: {
                        quality: "65-90",
                        speed: 4
                    },
                    svgo: {
                        plugins: [{
                            removeViewBox: false
                        }, {
                            removeEmptyAttrs: false
                        }]
                    }
                },
                plugins: [
                    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js')
                ]
            },
            clean(PATHS.dest),
            setFreeVariable('process.env.NODE_ENV', 'production'),
            uglifyJS(),
            extractCSS(PATHS.src)
        );
        break;

    default:
        const port = ((process.env.PORT | 0) || 4000) + 1;
        const publicPath = 'http://localhost:' + port + '/';
        const hot = 'webpack-hot-middleware/client?path=' + publicPath + '__webpack_hmr';
        config = merge(
            common,
            {
                entry: {
                    app: ['babel-polyfill', hot, PATHS.src]
                },
                output: {
                    publicPath: publicPath
                },
                module: {
                    loaders: [{
                        test: /\.(png|jpe?g|gif|svg)$/,
                        loaders: ['file?context=' + PATHS.src + '&name=[path][name].[ext]'],
                    }]
                },
                plugins: [
                    new webpack.HotModuleReplacementPlugin()
                ],
                devtool: 'eval-source-map'
            },
            setupCSS(PATHS.src)
        );
}

module.exports = config;
