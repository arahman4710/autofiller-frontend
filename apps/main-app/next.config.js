/** @type {import('next').NextConfig} */
const path = require('path')
const loaderUtils = require('loader-utils')
const RollbarSourcemapPlugin = require('rollbar-sourcemap-webpack-plugin')

const hashOnlyIdent = (context, _, exportName) =>
  loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, '/')}#className:${exportName}`
      ),
      'md4',
      'base64',
      6
    )
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .replace(/^(-?\d|--)/, '_$1')

const nextConfig = {
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        destination: 'https://app.posthog.com/:path*',
        source: '/ingest/:path*',
      },
      {
        destination: 'https://cdn.rollbar.com/rollbarjs/refs/tags/v2.26.2/rollbar.min.js',
        source: '/rb.js',
      },
      {
        destination: 'https://api.rollbar.com/api/1/item',
        source: '/rb/:path*',
      },
    ]
  },
  transpilePackages: ['@rag/ui'],
  webpack(config, { buildId, dev, isServer, webpack }) {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use))

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader?.includes('css-loader') &&
          !moduleLoader.loader?.includes('postcss-loader') &&
          moduleLoader.options !== undefined &&
          moduleLoader.options.modules !== undefined &&
          moduleLoader.options.modules.getLocalIdent !== undefined
        ) {
          moduleLoader.options.modules.getLocalIdent = hashOnlyIdent
        }
      })
    })

    if (isServer) {
      // next server build => ignore msw/browser
      if (Array.isArray(config.resolve.alias)) {
        // in Next the type is always object, so this branch isn't necessary. But to keep TS happy, avoid @ts-ignore and prevent possible future breaking changes it's good to have it
        config.resolve.alias.push({ alias: false, name: 'msw/browser' })
      } else {
        config.resolve.alias['msw/browser'] = false
      }
    } else {
      // browser => ignore msw/node
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ alias: false, name: 'msw/node' })
      } else {
        config.resolve.alias['msw/node'] = false
      }
    }

    if (process.env.ROLLBAR_SERVER_TOKEN) {
      const codeVersion = JSON.stringify(buildId)
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NEXT_BUILD_ID': codeVersion,
        })
      )

      config.plugins.push(
        new RollbarSourcemapPlugin({
          accessToken: process.env.ROLLBAR_SERVER_TOKEN,
          publicPath: process.env.NEXT_PUBLIC_APP_URL,
          version: codeVersion,
        })
      )
    }
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false

    return config
  },
}

module.exports = nextConfig
