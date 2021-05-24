import webpack from 'webpack';
import path from 'path';

export default (env, args) => {
  const inProduction = args.mode === 'production';
  const devtool = !inProduction && 'inline-source-map';
  const rules = [
    {
      test: /\.jsx?$/,
      use: ['babel-loader'],
    },
  ];

  return {
    devtool,
    entry: './src/entries/app.jsx',
    output: {
      path: path.join(__dirname, './public/js/'),
      filename: 'app.js',
    },
    module: { rules },
    resolve: {
      alias: {
        '~': path.join(__dirname, './src/'),
      },
      extensions: ['.js', '.jsx']
    },
  };
};