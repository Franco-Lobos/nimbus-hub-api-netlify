import { config } from '@netlify/remix-edge-adapter'

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ...config,
  loaderSideEffects: true,
  browserNodeBuiltinsPolyfill: {
    modules: {
      fs: 'empty',
      worker_threads: 'empty',
      process: 'empty',
      "stream/web": 'empty',
      buffer: 'empty',
      path: true,
      os: true,
      crypto: true, 
      net: true, 
      // expressMiddleware: expressRoutes,
    }
  },
  // This works out of the box with the Netlify adapter, but you can
  // add your own custom config here if you want to.
  //
  // See https://remix.run/file-conventions/remix-config
}
