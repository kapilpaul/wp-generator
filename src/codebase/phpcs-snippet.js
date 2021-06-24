export const phpcsCode = () => {
  let code = `<?xml version="1.0"?>
<ruleset name="project-name-features">
    <description>WordPress and VIP Go Coding Standards</description>

    <rule ref="WordPress">
        <exclude name="WordPress.Files.FileName.NotHyphenatedLowercase" />
        <exclude name="WordPress.Files.FileName.InvalidClassFileName" />
    </rule>

    <rule ref="PHPCompatibility">
        <exclude name="Generic.Arrays.DisallowShortArraySyntax.Found"/>
    </rule>

    <config name="testVersion" value="7.0-"/>

    <arg name="extensions" value="php"/>
    <arg value="s"/>

    <exclude-pattern>*/node_modules/*</exclude-pattern>
    <exclude-pattern>*/vendor/*</exclude-pattern>
    <exclude-pattern>.github/</exclude-pattern>

</ruleset>`;

  return code;
};
