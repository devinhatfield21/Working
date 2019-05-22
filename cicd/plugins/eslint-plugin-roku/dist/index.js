"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bright_1 = require("@roku-road/bright");
const { name, version } = require('../package.json');
exports.version = version;
const warnings = ['no-print', 'function-no-return', 'sub-to-function', 'no-shorthand-if', 'if-without-parentheses', 'function-no-return-type', 'if-with-then'];
const errors = ['no-stop'];
const allRules = [...warnings, ...errors].sort();
const makeRules = () => {
    const mapped = {};
    allRules.map(rule => (mapped[rule] = require(`./rules/${rule}`)));
    return mapped;
};
const addRule = (level = 'warn', mapped = {}) => rule => (mapped[`roku/${rule}`] = level);
const ruleConfig = () => {
    const mapped = {};
    warnings.map(addRule('warn', mapped));
    errors.map(addRule('error', mapped));
    return mapped;
};
const rules = makeRules();
exports.rules = rules;
const parseForESLint = (code) => {
    return {
        ast: bright_1.ast(code),
        code,
        scopeManager: null,
        services: {},
        visitorKeys: bright_1.visitorKeys
    };
};
exports.parseForESLint = parseForESLint;
const configs = {
    recommended: {
        parser: name,
        plugins: ['roku'],
        rules: ruleConfig()
    }
};
exports.configs = configs;
