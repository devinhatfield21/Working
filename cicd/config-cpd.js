const JSCPD_REPORT_JSON = "/report/jscpd-report.json";

const config = {
    "reportFilePath": JSCPD_REPORT_JSON,
    "options": {
        "threshold": 30.0,
        "format": [
            "python", 
            "markup"
        ],
        "formatsExts": {
            "python": "brs", 
            "markup": "xml"
        },
        "reporters": [
            "console",
            "json"
        ],
        "ignore": [
            "**/*.md",
            "**/cicd/**",
            "**/source/**",
            "**/sdks/**",
            "**/ComponentLibs/TGuardComponent/components/Authn/**",
            "**/tests/**"
        ],
        "absolute": true,
        "silent": true,
        "gitignore": true
    }
};

module.exports = config;