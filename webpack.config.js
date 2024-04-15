const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const commonConfig = {
    context: __dirname,
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                path.resolve(__dirname, "public", "manifest.json"),
                path.resolve(__dirname, "public", "logo192.png"),
                path.resolve(__dirname, "public", "robots.txt")
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            name: 'index',
            inject: true
        }),
    ],
    entry: path.resolve(__dirname, './src/index.js'),
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        filename: 'bundle.js',
        publicPath: process.env.ASSET_PATH || '/',
        path: path.resolve(__dirname, 'build'),
        assetModuleFilename: '[hash][ext][query]',
        clean: true,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: /[\\/]node_modules[\\/]/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
            },
            {
                test: /\.css$/i,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(ico|eot|svg|ttf|woff|woff2|png|jpg|gif|bmp)$/i,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'public')
                ],
                exclude: /[\\/]node_modules[\\/]/,
                type: 'asset/resource',
            }
        ],
    },
};
const devConfig = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        port: 3000,
        hot: true, // hot loading
        compress: true, // use gzip
        client: {
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: true,
            },
        },
        allowedHosts: 'all',
    },
    plugins: [
        new dotenv({
            path: path.join(__dirname, '.env.development')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.less$/i,
                include: [path.resolve(__dirname, 'src')],
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {},
                            additionalData: `@env: ${process.env.NODE_ENV};`
                        },
                    },
                ]
            },
        ]
    }
};
const prodConfig = {
    mode: 'production',
    plugins: [
        new dotenv({
            path: path.join(__dirname, '.env.production')
        }),
    ],
}

module.exports = (env, args) =>
{
    let envConfig = {};
    switch (args.mode)
    {
        case 'development':
            envConfig = merge(commonConfig, devConfig);
            break;
        case 'production':
            envConfig = merge(commonConfig, prodConfig);
            break;
        default:
            throw new Error('No matching configuration, i.e., development or production, was found.  Are you using the --mode switch?');
    }
    return envConfig;
}