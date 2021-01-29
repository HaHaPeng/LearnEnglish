const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const package = require('./package.json');

const {data} = package;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const widgetPathName = data.projectName;


module.exports = {
  entry: "./src/App.jsx",
  mode: 'production',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `[name].bundle.js`
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/react"]
          }
        }
      }, {
        test: /\.(css|less)$/,
        exclude: [/node_modules/],
        use:[
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                hashPrefix: 'my-custom-hash',
              }
            },
          },
          {
            loader: 'less-loader',
            options: {
            }
          }
        ]
      },{
        test: /\.(css|less)$/,
        include: [/node_modules/],
        use:[
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
            }
          }
        ]
      }, {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: [
           {
            loader: 'file-loader',
            options: {
              name: `${widgetPathName}/assets/img/[name].[hash:8].[ext]`,
            }
          }
        ]
        
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "LearnEnglish",
      filename: "index.html",
      template: resolveApp("public/index.html"),
      inject: true,
      chunksSortMode: 'none',
      inlineSource: '.(css)$'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].css"
    })
  ]
}