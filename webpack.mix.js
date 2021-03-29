let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const pugConfig = {
  locals: {
    config: { baseUrl: 'http://hse.loc/' }
  },
  pug: {
    pretty: true,
    debug: true
  }
};

mix.js('resources/markup/js/app.js', 'js')
  .vue()
  .sass('resources/markup/sass/app.scss', 'css', {}, [
      require("tailwindcss")
    ])
  .pug('resources/markup/pug/*.pug', '../../../public/dist', pugConfig)
  .setPublicPath('public/dist')
  .sourceMaps();

mix.webpackConfig({
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          to: 'images', // Laravel mix will place this in 'public/img'
          context: 'resources/markup/images/'
        }
      ]
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 80,
        })
      ]
    })
  ]
})
