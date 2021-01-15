const path = require("path"),
  webpack = require("webpack"),
  __chunkPath = path.join(__dirname, "src"),
  __publicPath = path.join(__dirname, "public"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  // ExtractTextPlugin = require("extract-text-webpack-plugin"),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


module.exports = {
  name: "react", //used to name this config for npm-scripts
  mode: "development",
  devtool: "source-map", // 'eval' || 'source-map' || 'cheap-module-source-map'
  // target: 'node',
  entry: {
    // "dev-server": [path.resolve("./")
    //   'webpack-hot-middleware/client?http://localhost:9000&timeout=20000',
    //   'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    //   'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
    // ],
    "index": [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2500",
      "webpack/hot/only-dev-server",
      "./src/index"
    ],
    // "main": "./src/assets/less/main.less"
  },
  output: {
    path: __publicPath,
    publicPath: "/",
    filename: '[name].bundle.js',
    hotUpdateMainFilename: '.hot/_[hash].json',
    hotUpdateChunkFilename: '.hot/_[id].[hash].js'
  },
  stats: {
    // exclude: false,
    // excludeModules: false,
    // moduleTrace: false,
    // depth: false,
    // cached: false*+,
    // cachedAssets: false,
    // chunks: false,
    // chunkModules: false,
    // chunkOrigins: false,
    // warnings: false,
    // modules: false,
    // assets: false,
    // source: false,
  },
  module: {
    rules: [{
      //JSON, JSX, JS
        test: [/\.(jsx|js)$/i],
        exclude: [
          /node_modules/,
          path.resolve(__dirname, "node_modules"),
        ],
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                "@babel/plugin-transform-react-jsx",
                "@babel/plugin-transform-async-to-generator",
              ],
              presets: ["@babel/react"],
              // presets: ["babel-preset-stage-3"],
            }
          }
        ]
      },
      {
        //JPEG, JPG, PNG, SVG
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
            loader: "url-loader",
            options: {
              limit: 10000 //10kb
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        // LESS...
        test: /\.(less|css)$/i,
        use: [
          "style-loader",
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: { hmr: true, reloadAll: false }
          // },
          "css-loader",
          "less-loader"
        ]
      },
      { ////svg loaders
        test: [/\.svg$/],
        exclude: path.resolve(__dirname, "node_modules"),
        use: ["css-loader", "svg-loader"]
      },
      { ///html loaders (transforms HtmlWebpackPlugin's payload)
        test: [/\.htm?l$/, ],
        exclude: path.resolve(__dirname, "node_modules"),
        include: [__chunkPath], ///transforms tmpl8-html, includes bundle.js & other entrypoints...
        use: [{
            loader: "file-loader",
            options: {
              publicPath: "/",
              name: "[path][name].[ext]"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "html-loader"
          },
        ]
      },
      { ////fontawesome loaders
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\npm?)|\.eot($|\?)|\.svg($|\?)/,
        use: "url-loader"
      }
    ]
  },
  plugins: [
    //    new CleanWebpackPlugin(path.resolve(__dirnules?, modules?, nestedModules?, moduleAssets?, children?, cached?, cachedAssets?, reasons?, source?, warnings?, errors?, warningsFilter?, excludeAssets?, excludeModules?, exclude?, entrypoints?, chunkGroups?, errorDetails?,ame,"src")),
    //    new webpack.optimize.UglifyJsPlugin(),
    // new ExtractTextPlugin({
      //   filename: "assets/css/main.css",
      // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
    }),
    new HtmlWebpackPlugin({ //,excludeChunks: [], chunks: []
      template: "index.template.html",
      chunks: ['dev-server', 'index'],
      excludeChunks: ["modules"],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".less", ".html", ".css", "*"],
    alias: {
      __chunkPath: __chunkPath,
      __publicPath: __publicPath,
      noti5: "jquery-noti5/noti5.min",
      waves: "node-waves/dist/waves.min",
      jqueryui: "jquery-ui-dist/jquery-ui",
      sortablejs: "sortablejs/dist/sortable.umd",
    }
  },
  // watch: true,
  watchOptions: {
    ignored: [
      /node_modules/,
      "server.js",
    ]
  }
};
