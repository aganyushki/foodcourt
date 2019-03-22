'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    devtool: 'source-map',
    mode: "development",
    entry: {
        index: path.resolve(__dirname, "../src/main/javascript/far/galaxy/foodcourt/web/index.js")
    },
    output: {
        path: path.resolve(__dirname, "../build/out"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            [
                                "@babel/plugin-proposal-decorators",
                                {
                                    "legacy": true
                                }
                            ],
                            [
                                "@babel/plugin-proposal-class-properties",
                                {
                                    "loose": true
                                }
                            ],
                            [
                                "@babel/plugin-proposal-export-default-from"
                            ],
                            [
                                "add-react-displayname"
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            "node_modules"
        ]
    },
    plugins: [

    ],
    devServer: {
        contentBase: './build/out',
        proxy: {
            '/api': {
                target: 'http://localhost:80'
            }
        }
    }
};

module.exports = config;

config.plugins.push(new CleanWebpackPlugin());

const HtmlWebpackPlugin = require('html-webpack-plugin');
config.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/main/resources/index.html')
}));
