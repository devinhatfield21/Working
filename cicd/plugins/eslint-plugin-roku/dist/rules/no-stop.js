"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta = {
    docs: {
        category: 'Possible Errors',
        description: 'disallow the use of `stop`',
        recommended: true,
        url: 'https://www.rokuroad.com/docs/rules/no-stop'
    },
    fixable: 'code',
    messages: { unexpected: 'Unexpected {{statement}} statement.' },
    schema: []
};
exports.meta = meta;
const create = (context) => {
    return {
        StopStatement(node) {
            context.report({
                data: { statement: 'stop' },
                messageId: 'unexpected',
                node
            });
        }
    };
};
exports.create = create;
