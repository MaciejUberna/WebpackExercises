// package already exists within node.js installation
//this path requirers absolute pat to the place whre an output file should be written to
const path = require('path'); // this is a node.js syntax
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// doc on: https://webpack.js.org/
module.exports = {
    //first we set up an entry point.
    //__dirname is an absolute path tho the folder this file lives in
    entry: './src/index.js',
    mode: 'development',
    output: {
        //the bundle file should be written to the 'dist' folder
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    //Its where sourse maps will be stored
    devtool: 'cheap-module-eval-source-map',
    //rules for babel
    module: {
        rules: [
            {
                // any file ended with .js will be affected by this rule
                test: /\.js$/, // regular expression that tells which file extensions should be affected
                //loader: tells webpack wihich tool takes over for this file ("babel-loader": "^8.1.0")
                loader: 'babel-loader',
                exclude: /node_modules/ //exclude node modules because we are not transforming any code there
            },
            {
                test: /\.css$/, //css files
                exclude: /node_modules/,
                //we use multiple loaders
                use: [
                    //style loader is responsible for injecting css code into html file
                    { loader: 'style-loader' },
                    // css is responsible for underestanding our css imports
                    { loader: 'css-loader', options: {
                        importLoaders: 1
                    } },
                    { loader: 'postcss-loader', options: {
                        ident: 'postcss',
                        plugins: () => [autoprefixer()]
                    } }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=8000&name=images/[name].[ext]',

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};