export const readmeCode = (data) => {
  let code = `=== ${data.pluginName} ===
Contributors: ${data.author}
Donate link: ${data.authorURI}
Tags: 
Requires at least: 4.0
Tested up to: 5.4
Stable tag: trunk
Requires PHP: 5.6
License: ${data.license} or later
License URI: ${data.licenseURI}

${data.description}

== Description ==

${data.description}

== Installation ==

//plugin installation guide

== Changelog ==

= ${data.version} =
* Initial release`;

  return code;
};
