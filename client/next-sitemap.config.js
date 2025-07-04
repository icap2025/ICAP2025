/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://icap2025.sust.edu/',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
