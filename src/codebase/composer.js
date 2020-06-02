export const composerCode = (data) => {
  let baseNamespace = data.baseNamespace.replace(/\\/g, "\\\\");

  let code = `{
    "name": "${data.author.replace(/\s/g, "-")}/${data.pluginName}",
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
