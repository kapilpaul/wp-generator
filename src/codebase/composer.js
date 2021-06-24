import { slug } from "../utils/helpers";
export const composerCode = (data) => {
  let baseNamespace = data.baseNamespace.replace(/\\/g, "\\\\");

  let code = `{
    "name": "${data.author.replace(/\s/g, '').toLowerCase()}/${slug(data.pluginName)}",
    "description": "${data.description}",
    "type": "wordpress-plugin",
    "license": "${data.license}",
    "authors": [
        {
            "name": "${data.author}",
            "email": "${data.authorEmail}"
        }
    ],
    "minimum-stability": "dev",
    "require": {},
    "require-dev": {
        "wp-coding-standards/wpcs": "^2.3",
        "dealerdirect/phpcodesniffer-composer-installer": "^0.4.1 || ^0.5 || ^0.6.2 || ^0.7",
        "phpcompatibility/phpcompatibility-wp": "dev-master",
        "phpunit/phpunit": ">=5.7.27"
    },
    "autoload": {
        "psr-4": {
            "${baseNamespace}\\\\": "includes/"
        },
        "files": [
            "includes/functions.php"
        ]
    }
}
`;

  return code;
};
