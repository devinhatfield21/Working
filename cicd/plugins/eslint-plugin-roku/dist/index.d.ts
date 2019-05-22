declare const version: any;
declare const rules: {};
declare const parseForESLint: (code: string) => {
    ast: any;
    code: string;
    scopeManager: any;
    services: {};
    visitorKeys: any;
};
declare const configs: {
    recommended: {
        parser: any;
        plugins: string[];
        rules: {};
    };
};
export { configs, rules, parseForESLint, version };
