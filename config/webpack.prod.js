const {
    merge
} = require('webpack-merge');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); //每次构建清除之前的缓存
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const commom = require('./webpack.common');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '..');

function resolve(dir) {
    return path.join(ROOT_PATH, dir);
}
module.exports = merge(commom, {
    mode: 'production',
    // devServer: {
    //     // 当使用 [HTML5 History API] 时，任意的 `404` 响应被替代为 `index.html`
    //     historyApiFallback: true,
    //     open: true, // 自动打开浏览器
    //     // 默认为true
    //     hot: true,
    //     // 是否开启代码压缩
    //     compress: true,
    //     // 启动的端口
    //     port: 9000,
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new AssetsWebpackPlugin({
            filename: 'manifest.json',
            path: resolve('/dist/assets'),
            prettyPrint: true
          }),
    ],
});