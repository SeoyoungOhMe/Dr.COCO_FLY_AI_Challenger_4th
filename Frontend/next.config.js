/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const nextConfig = {
	reactStrictMode: true,
};

// module.exports = {
//   reactStrictMode: false,
//   compress: false,
//   poweredByHeader: false,
//   generateEtags: true,
//   distDir: ".next",
//   httpAgentOptions: {
//     keepAlive: true,
//   },
//   devIndicators: {
//     buildActivity: true,
//     buildActivityPosition: "bottom-right",
//   },
//   images: {
//     loader: "custom",
//   },
//   basePath: process.env.NODE_ENV === "production" ? "/human-next/out" : "",
//   assetPrefix: process.env.NODE_ENV === "production" ? "/human-next/out/" : "",
//   exportPathMap: async function (
//     defaultPathMap,
//     { dev, dir, outDir, distDir, buildId }
//   ) {
//     return {
//       "/": { page: "/" },
//     };
//   },
//   webpack: (config, options) => {
//     config.module.rules.push({ test: /human.esm.js/, type: "javascript/esm" });
//     return config;
//   },
// };

module.exports = withPlugins(
	[

		[
			withPWA,
			{
				pwa: {
					dest: "public",
				},
			},
		],

	],

	nextConfig
  
);