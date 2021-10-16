const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 把css分割为单个文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    VueLoaderPlugin
} = require('vue-loader');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const ROOT_PATH = path.resolve(__dirname, '..');

function resolve(dir) {
    return path.join(ROOT_PATH, dir);
}

module.exports = {
    context: resolve('src/client/javascript'),
    entry: './main.js',
    output: {
        // filename: 'bundle.js',
        // [contenthash:8] - 本应用打包输出文件级别的更新，导致输出文件名变化
        filename: "[name]-[contenthash:8].js",
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader', // 处理vue
                include: [resolve('src'), ],
            },
            /* babel 转码 */
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
            },
            /* css 转码 */
            {
                test: /\.(sa|sc|le|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "postcss-loader",
                    // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: 'assets/images/[hash][ext][query]'
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[hash][ext][query]",
                },
            },
        ],
    },

    resolve: {
        alias: {
            '@': resolve('src/client/javascripts'),
        },
        mainFiles: ['index', 'main'],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "assets/[name].css",
        }),
        /*
         * html 模板
         * 把生成的资源插入到模板中,生成新的页面,避免手动管理资源
         * https://webpack.docschina.org/plugins/html-webpack-plugin/
         */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('src/views/index.html')
        }),
        // 进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                parallel: 4,
            }),
        ],
    },
};