const path = require('path')
const pathsPlugin = require('tsconfig-paths-webpack-plugin')

const resolvePath = p => path.join(path.resolve(__dirname, p))

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  /*"webpackFinal": async config => {
    config.resolve.plugins.push(new TsconfigPathsPlugin())
    return config
  }*/
  /*webpackFinal(config) {
    return {
      ...config,
      resolve: {
        alias: {
          ...config.resolve.alias,
          '@': resolvePath('../src/'),
          '@shared': resolvePath('../src/shared'),
          '@features': resolvePath('../src/features')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }
    }
  }*/
  webpackFinal: async (config) => {
    /*config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    })

    return config*/
    return {
      ...config,
      resolve: {
        alias: {
          ...config.resolve.alias,
          '@': resolvePath('../src/'),
          '@shared': resolvePath('../src/shared/'),
          '@features': resolvePath('../src/features/')
        },
        plugins: [
          new pathsPlugin()
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.s[ac]ss/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        ]
      }
    }
  }
}