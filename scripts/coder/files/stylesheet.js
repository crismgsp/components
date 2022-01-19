/* eslint-disable @typescript-eslint/no-var-requires */
const core = require('../core/core');

const path = './lib/core/stylesheet';

const generators = {
  StyleSheet_attributes() {
    const contract = {
      name: 'StyleSheet_attributes',
      contract: core.readFile(`${path}/stylesheet.json`, 'json'),
    };
    core.applyContract(contract, `${path}/stylesheet.dart`, ([name, value]) => {
      return `final Map<Breakpoints,${value.type}> ${name};`;
    });

    core.applyContract(contract, `${path}/stylesheet.ts`, ([name, value]) => {
      const types = {
        double: 'number | string',
      };
      const type = (
        types[value.type.replace('?', '')] || value.type.replace('?', '')
      ).toLowerCase();
      return `${name}?: ResponsiveProperty<${type}> | string;`;
    });
  },
};

module.exports = {
  path,
  generators,
};
