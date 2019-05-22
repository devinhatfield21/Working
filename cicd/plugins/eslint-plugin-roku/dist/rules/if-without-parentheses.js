"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta = {
    docs: {
        category: 'Stylistic Issues',
        description: 'disallow the use `if` without `parentheses`',
        recommended: true,
        url: ''
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
                const ifToken = context.getTokens(node)[0];
                const ifBody = node.consequent;
                const tokens = context.getTokensBetween(ifToken, ifBody);
                let numberOfOpenParen = 0;
                let numberOfCloseParen = 0;
                let isMissingOpenParen = false;
                let isMissingCloseParen = false;
                let missingPart = "";
                tokens.forEach(token => {
                    if (token.type === "OPEN_PAREN") {
                        numberOfOpenParen++;
                    }
                    else if (token.type === "CLOSE_PAREN") {
                        numberOfCloseParen++;
                    }
                });
                if ((numberOfOpenParen === 0 && numberOfCloseParen === 0) || tokens[0].type !== "OPEN_PAREN") {
                    isMissingOpenParen = isMissingCloseParen = true;
                }
                if (numberOfOpenParen < numberOfCloseParen) {
                    isMissingOpenParen = true;
                }
                if (numberOfOpenParen > numberOfCloseParen) {
                    isMissingCloseParen = true;
                }
                if (isMissingOpenParen) {
                    missingPart += "(";
                }
                if (isMissingCloseParen) {
                    missingPart += ")";
                }
                if (isMissingOpenParen || isMissingCloseParen) {
                    context.report({
                        data: { statement: 'if', part: missingPart },
                        messageId: 'missing',
                        node
                    });
                }
            }
        },
        ElseIfStatement(node) {
            const tokens = context.getTokens(node);
            let numberOfOpenParen = 0;
            let numberOfCloseParen = 0;
            let isMissingOpenParen = false;
            let isMissingCloseParen = false;
            let missingPart = "";
            tokens.forEach(token => {
                if (token.type === "OPEN_PAREN") {
                    numberOfOpenParen++;
                }
                else if (token.type === "CLOSE_PAREN") {
                    numberOfCloseParen++;
                }
            });
            if ((numberOfOpenParen === 0 && numberOfCloseParen === 0) || tokens[1].type !== "OPEN_PAREN") {
                isMissingOpenParen = isMissingCloseParen = true;
            }
            if (numberOfOpenParen < numberOfCloseParen) {
                isMissingOpenParen = true;
            }
            if (numberOfOpenParen > numberOfCloseParen) {
                isMissingCloseParen = true;
            }
            if (isMissingOpenParen) {
                missingPart += "(";
            }
            if (isMissingCloseParen) {
                missingPart += ")";
            }
            if (isMissingOpenParen || isMissingCloseParen) {
                context.report({
                    data: { statement: 'else if', part: missingPart },
                    messageId: 'missing',
                    node
                });
            }
        }
    };
};
exports.create = create;
