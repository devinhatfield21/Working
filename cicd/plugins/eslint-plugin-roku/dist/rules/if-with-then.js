"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta = {
    docs: {
        category: 'Stylistic Issues',
        description: 'disallow the use `if` with `then`',
        recommended: true,
        url: ''
    },
    fixable: 'code',
    messages: { invalid: 'No need "{{part}}" in "{{statement}}" statement.' },
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
                if (maybeThen) {
                    context.report({
                        data: { statement: 'if', part: 'then' },
                        messageId: 'invalid',
                        node
                    });
                }
            }
        },
        ElseIfStatement(node) {
            const tokens = context.getTokens(node);
            if (tokens.find(t => t.type === "THEN")) {
                context.report({
                    data: { statement: 'else if', part: 'then' },
                    messageId: 'invalid',
                    node
                });
            }
        }
    };
};
exports.create = create;
