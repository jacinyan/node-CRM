const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',

    //sourceMap
    devtool: 'source-map',

    entry: {
        // new folder
        'js/app': './src/app.js'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name]-[hash:6].js'
    },

    // mind 'use' 
    module: {
        rules: [{
            test: /\.art$/,
            use: [
                {
                    loader: 'art-template-loader'
                }
            ]
        }]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/public/index.html'),
            filename: 'index.html',
            // default 'inject' arg issues, potential version issue
            inject: true
        }),
        new CopyPlugin(
            {//missing 'patterns' for ^6.x.x 
                patterns:
                    [{

                        from: './public/*.ico',
                        to: path.join(__dirname, '/dist/favicon.ico'),
                    }]
            }
        )
    ],
    // server
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        compress: true,
        port: 9000
    }
}