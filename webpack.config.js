var path = require('path');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);//相当于执行cd,得到pwd
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
console.log(__dirname,1);

var webpack = require('webpack');
//在有多个入口文件时，这些入口文件可能会有一些共同的代码，我们便可以将这些共同的代码抽取出来成独立的文件
//抽取出来的css文件的命名将会是参数中name的值，而js文件名则会是filename的值
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',//找到错误代码处
	entry: {
		//“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
		index : __dirname + '/app/main.js',
		//分离第三方库
		vendors: ['react','react-dom','jquery']
	},
	output: {
		path: __dirname + "/dist",//打包后的文件存放的地方
		filename: "bundle.js"//打包后输出文件的文件名
	},
	devServer: {
		hot:true,
		//contentBase: "./dist",//本地服务器所加载的页面所在的目录
		colors: true,//终端中输出结果为彩色
		historyApiFallback: true,//不跳转
		inline: true//实时刷新
	},
	module: {
		//加载器配置
		loaders: [
			//webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，
			// css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,
			// style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入
			// webpack打包后的JS文件中。
			{
				test: /\.css$/,//test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
				//loader: 'style-loader!css-loader?modules'//loader：loader的名称（必须）
				loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
			},
			//include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
			//query：为loaders提供额外的设置选项（可选）
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'react-hot!babel',//在webpack的module部分的loaders里进行配置即可
			},
			{
				test: /\.json$/,
				loader: "json"
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style', 'css!less')
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192'
			}
		]
	},
	postcss: [
		require('autoprefixer')//调用autoprefixer插件
	],
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
			//title: 'Hello World app'
		}),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new webpack.HotModuleReplacementPlugin(),//热加载插件
		new webpack.optimize.OccurenceOrderPlugin(),
		//new webpack.optimize.UglifyJsPlugin(),
		//[name]表示entry中的key
		new ExtractTextPlugin("[name].css"),
		//设置全局性的别名
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			React: 'react',
			ReactDOM: 'react-dom'
		})
	],
	externals: {
		jquery: 'window.$'
	},
	resolve: {
		//root: 'E:/my_project/webpack-test/app', //绝对路径
		//js中import加载jsx这种扩展名的脚本
		extensions: ['', '.js', '.json', '.scss','.css','.less'],
		alias: { //别名
			AppStore : 'js/stores/AppStores.js',
			ActionType : 'js/actions/ActionType.js',
			AppAction : 'js/actions/AppAction.js'
		}
	}
}