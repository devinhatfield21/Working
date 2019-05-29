const BASE_OUTPUT_FOLDER = "cicd/out";
const DEFAULT_ENV_CONFIG = "\"defaultEnvironment\": ";

const LOG_KEYS = ['logInfo', 'logError', 'logDebug'];

const IGNORE_LOG_REGEXP = new RegExp("(^([ ]|\\t)*(" + LOG_KEYS.join('|') + ")\\(.*\\))|\(.*\\) *then *log.*$\)|(.*logger\.log.*)", "gim");
const IGNORE_LOG_SCRIPT = new RegExp(/^([ ]|\t)*(<script type="text\/brightscript").*LoggerPlugin.brs.*$/gm);
const IGNORE_TRACKERTASK_SCRIPT = new RegExp(/^([ ]|\t)*(m.tracker).*$/gm);
const IGNORE_TRAILING_SPACE_REGEXP = new RegExp(/[ \t]+$/gm);
const COMMENT_LINE_REGEXP = new RegExp(/(^'|^([ ]*)').*$/gm);
const BLANK_LINE_REGEXP = new RegExp(/^\s*$(?:\r\n?|\n)/gm);
const XML_COMMENT_REGEXP = new RegExp(/(.?)<!--.*?-->/gm);
const XML_BLOCKCOMMENT_REGEXP = new RegExp(/^<!--[\s\S\n]*?-->$/gm);
const TEST_RESULT_REGEXP = /(?<=\*|--)(.*(\n|\r))/gm
const BEGIN_SPACE_REGEXP = new RegExp(/^ +/gm);
const END_SPACE_REGEXP = new RegExp(/ +$/gm);

const TESTS_FOLDER_FILTER = ['!**/tests/**/*', '!**/tests', '!**/testFramework/**/*', '!**/testFramework'];
const LOGGER_FILE_FILTER = ['!**/LoggerPlugin.brs'];
const README_FILE_FILTER = ['!**/README.md'];
const TRACKERTASK_FILE_FILTER = ['!**/components/TrackerTask.xml'];

const config = {
    "baseOutputFolder": BASE_OUTPUT_FOLDER,
    "testResultRegexp": TEST_RESULT_REGEXP,
    "defaultEnvConfig": DEFAULT_ENV_CONFIG,
    "projects": {
        "Roku": {
            "name": "__ProjectName",
            "description": "__Project Description",
            "path": "./Roku",
            "dependencies": [""]
        },
        "Devin": {
            "name": "__ProjectName1",
            "description": "__Project1 Description",
            "path": "./Devin",
            "dependencies": [""]
        },
        "hello-world": {
            "name": "Hello World",
            "description": "__Project1 Description",
            "path": "./hello-world",
            "dependencies": [""]
        },
        "Sample": {
            "name": "Hello World",
            "description": "__Project1 Description",
            "path": "./Sample",
            "dependencies": [""]
        }
    },
    "mode": {
        "DEV": {
            "regex": [],
            "filter": TESTS_FOLDER_FILTER.concat(README_FILE_FILTER)
        },
        "PROD": {
            "regex": [IGNORE_TRAILING_SPACE_REGEXP, IGNORE_LOG_SCRIPT, IGNORE_LOG_REGEXP, XML_BLOCKCOMMENT_REGEXP, XML_COMMENT_REGEXP, COMMENT_LINE_REGEXP, BLANK_LINE_REGEXP],
            "filter": TESTS_FOLDER_FILTER.concat(LOGGER_FILE_FILTER).concat(README_FILE_FILTER)
        },
        "RELEASE": {
            "regex": [IGNORE_TRAILING_SPACE_REGEXP, IGNORE_LOG_SCRIPT, IGNORE_LOG_REGEXP, XML_BLOCKCOMMENT_REGEXP, XML_COMMENT_REGEXP, COMMENT_LINE_REGEXP, IGNORE_TRACKERTASK_SCRIPT, BLANK_LINE_REGEXP, BEGIN_SPACE_REGEXP, END_SPACE_REGEXP],
            "filter": TESTS_FOLDER_FILTER.concat(LOGGER_FILE_FILTER).concat(README_FILE_FILTER).concat(TRACKERTASK_FILE_FILTER)
        }
    }
};

module.exports = config;