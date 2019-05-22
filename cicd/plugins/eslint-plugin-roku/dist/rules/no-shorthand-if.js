"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta = {
    docs: {
        category: 'Stylistic Issues',
        description: 'disallow the use `if` without `then`',
        recommended: true,
        url: 'https://www.rokuroad.com/docs/rules/no-shorthand-if'
    },
    fixable: 'code',
    messages: { missing: 'Missing "{{part}}" in "{{statement}}" statement.' },
    schema: []
};
exports.meta = meta;
const create = (context) => {
    return {
        IfStatement(node) {
            if (!node.consequent) {
                context.report({
                    data: { statement: 'after if', part: 'expression' },
                    messageId: 'missing',
                    node
                });
            }
            else {
                const tokens = context.getTokensBefore(node.consequent, 2);
                const maybeThen = tokens.find((t) => t.type === 'THEN');
                if (!maybeThen) {
                    context.report({
                        data: { statement: 'if', part: 'then' },
                        messageId: 'missing',
                        node
                    });
                }
            }
        }
    };
};
exports.create = create;
