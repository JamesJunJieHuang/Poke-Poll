const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.s?css/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.jsx?/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, //10KB limit for inline
          },
        },
        generator: {
          filename: "images/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
  ],
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    port: 8080,
    host: "localhost",
    historyApiFallback: true,
    static: {
      publicPath: "/",
      directory: path.join(__dirname, "./client"),
    },
    // proxy: {
    //   context: ["api/**"],
    //   target: "http://localhost:3000/",
    //   secure: false,
    //   "/dogs": "http://localhost:3000/",
    // },
    proxy: {
      "/api/**": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
};
