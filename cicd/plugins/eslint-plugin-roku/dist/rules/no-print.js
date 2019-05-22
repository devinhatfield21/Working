"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta = {
    docs: {
        category: 'Possible Errors',
        description: 'disallow the use of `print` and `?`',
        recommended: true,
        url: 'https://www.rokuroad.com/docs/rules/no-print'
    },
    fixable: 'code',
    messages: { unexpected: 'Unexpected {{statement}} statement.' },
    schema: []
};
exports.meta = meta;
const create = (context) => {
    return {
        PrintStatement(node) {
            context.report({
                data: { statement: 'print' },
                messageId: 'unexpected',
                node
            });
        }
    };
};
exports.create = create;
