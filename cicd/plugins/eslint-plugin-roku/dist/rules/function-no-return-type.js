"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta = {
    docs: {
        category: 'Stylistic Issues',
        description: 'Check that `Function` without defined return type',
        recommended: true,
        url: 'https://www.rokuroad.com/docs/rules/sub-to-function'
    },
    fixable: 'code',
    messages: {
        invalid: 'Function {{name}} has an invalid return type - {{type}}',
        missing: 'Function {{name}} should has a return type (Object, String, Integer, Double, Float, Boolean, Void, Dynamic, LongInteger)',
    },
    schema: []
};
exports.meta = meta;
const VALID_RETURN_TYPES = ["object", "string", "integer", "double", "float", "boolean", "void", "dynamic", "longinteger"];
const create = (context) => {
    return {
        FunctionDeclaration(node) {
            const { id, ReturnType } = node;
            const name = id.name;
            if (!ReturnType || !ReturnType.value) {
                context.report({
                    data: {
                        name,
                    },
                    messageId: "missing",
                    node
                });
            }
            else {
                const returnType = ReturnType.value.toLowerCase();
                if (VALID_RETURN_TYPES.map(t => t.toLowerCase()).indexOf(returnType) < 0) {
                    context.report({
                        data: {
                            name,
                            returnType,
                        },
                        messageId: "invalid",
                        node
                    });
                }
            }
        }
    };
};
exports.create = create;
