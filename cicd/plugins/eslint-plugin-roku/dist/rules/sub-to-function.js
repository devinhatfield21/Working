"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta = {
    docs: {
        category: 'Stylistic Issues',
        description: 'Enforce `Function as Void` over `Sub()`',
        recommended: true,
        url: 'https://www.rokuroad.com/docs/rules/sub-to-function'
    },
    fixable: 'code',
    messages: {
        noReturn: 'Sub {{name}} should not have a return type ({{type}}). Consider replacing it with Function'
    },
    schema: []
};
exports.meta = meta;
const create = (context) => {
    return {
        SubDeclaration(node) {
            const { id, ReturnType } = node;
            const name = id.name;
            const type = ReturnType && ReturnType.value.toLowerCase();
            if (type) {
                context.report({
                    data: {
                        name,
                        type
                    },
                    messageId: 'noReturn',
                    node
                });
            }
        }
    };
};
exports.create = create;
