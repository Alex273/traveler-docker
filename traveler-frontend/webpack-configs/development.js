const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const fileName = (ext) => (IS_DEVELOPMENT ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimize = () => {
    return {
        splitChunks: {
            chunks: 'all',
        },
    };
};

const getBabelOptions = (preset) => {
    const options = {
        presets: ['@babel/preset-env'],
        plugins: [],
    };

    if (preset) {
        options.presets.push(preset);
    }

    return options;
};

const jsLoaders = () => {
    return [
        {
            loader: 'babel-loader',
            options: getBabelOptions(),
        },
        {
            loader: 'eslint-loader',
        },
    ];
};

const getPlugins = () => {
    return [
        new HTMLWebpackPlugin({
            template: './templates/index.html',
            minify: {
                collapseWhitespace: false,
                removeComments: false,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/shared/assets/favicon.ico'),
                    to: path.resolve(__dirname, '../dist/favicon.ico'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css'),
        }),
    ];
};

module.exports = () => {
    return {
        context: path.resolve(__dirname, '../src'),
        mode: 'development',
        entry: {
            main: ['@babel/polyfill', './index.tsx'],
        },
        resolve: {
            alias: {
                '@app': path.resolve(__dirname, `../${paths.applicationsRootFolder}`),
                '@pages': path.resolve(__dirname, '../src/pages'),
                '@widgets': path.resolve(__dirname, '../src/widgets'),
                '@features': path.resolve(__dirname, '../src/features'),
                '@shared': path.resolve(__dirname, '../src/shared'),
                '@components': path.resolve(__dirname, '../src/shared/components'),
                '@styles': path.resolve(__dirname, '../src/app/styles'),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.png', '.jpg', '.jpeg', '.svg', '.gif'],
            modules: ['node_modules'],
        },
        output: {
            path: path.resolve(__dirname, `../${paths.distributionFolder}`),
            publicPath: '/',
            filename: fileName('js'),
        },
        optimization: optimize(),
        devServer: {
            static: {
                directory: path.join(__dirname, path.join(__dirname, `../${paths.distributionFolder}`)),
            },
            hot: true,
            host: 'localhost',
            port: '5000',
            historyApiFallback: {
                disableDotRule: true,
            },
        },
        experiments: {
            topLevelAwait: true,
        },
        devtool: 'source-map',
        plugins: getPlugins(),
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                attributes: {
                                    class: 'my-scss-module',
                                },
                            },
                        },
                        {
                            loader: '@teamsupercell/typings-for-css-modules-loader',
                            options: {
                                formatter: 'prettier',
                                banner: '// autogenerated by typings-for-css-modules-loader. \n// Please do not change this file!',
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: {
                                    localIdentName: '[local]----[hash:6]',
                                },
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {loader: 'sass-loader', options: {sourceMap: true}},
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                attributes: {
                                    class: 'my-css-module',
                                },
                            },
                        },
                        {
                            loader: '@teamsupercell/typings-for-css-modules-loader',
                            options: {
                                formatter: 'prettier',
                                banner: '// autogenerated by typings-for-css-modules-loader. \n// Please do not change this file!',
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: {
                                    localIdentName: '[local]',
                                },
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[hash][ext]',
                    },
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|)$/,
                    type: 'asset/inline',
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: jsLoaders(),
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: getBabelOptions('@babel/preset-typescript'),
                        },
                    ],
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: getBabelOptions('@babel/preset-react'),
                        },
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
    };
};
