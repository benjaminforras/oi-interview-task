module.exports = {
  '{apps,libs,tools}/**/*.{ts,tsx}': (files) => {
    return `nx affected --target=typecheck --files=${files.join(',')}`;
  },
  '{apps,libs,tools}/**/*.{js,ts,jsx,tsx}': [(files) => `nx affected:lint --files=${files.join(',')}`],
  '{apps,libs,tools}/**/*.{html,css,scss,js,ts,jsx,tsx,json}': (files) => `nx format:write --files=${files.join(',')}`,
};
