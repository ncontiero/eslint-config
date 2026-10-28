import { TEMPLATE_ENGINE_SYNTAX } from "@html-eslint/parser";
import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";
import { type OptionsConfig, ncontiero } from "../src";

describe("html template engine syntax", () => {
  const createESLint = async (options?: OptionsConfig) => {
    const configs = await ncontiero({
      typescript: false,
      ...options,
    });

    return new ESLint({
      overrideConfigFile: true,
      overrideConfig: configs,
    });
  };

  it("should support default nunjucks template engine syntax in expressions and tags", async () => {
    const eslint = await createESLint({ html: true });
    const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Test</title>
</head>
<body>
  <div class="{{ className }}">
    <span>{{ message }}</span>
    {# this is a nunjucks comment #}
    {% set greeting = "Hello" %}
    <p>{{ greeting }}</p>
  </div>
</body>
</html>
    `.trim();

    const results = await eslint.lintText(code, { filePath: "test.html" });
    const errors = results[0].messages.filter((msg) => msg.severity === 2);

    expect(errors).toEqual([]);
  });

  it("should ignore duplicate IDs across mutually exclusive nunjucks branches", async () => {
    const eslint = await createESLint({ html: true });
    const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Test</title>
</head>
<body>
  {% if isUser %}
    <button id="action-btn" type="button">User Action</button>
  {% else %}
    <button id="action-btn" type="button">Guest Action</button>
  {% endif %}
</body>
</html>
    `.trim();

    const results = await eslint.lintText(code, { filePath: "test.html" });
    const duplicateIdErrors = results[0].messages.filter(
      (msg) => msg.ruleId === "html/no-duplicate-id",
    );

    expect(duplicateIdErrors).toHaveLength(0);
  });

  it("should still catch duplicate IDs outside template branches", async () => {
    const eslint = await createESLint({ html: true });
    const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Test</title>
</head>
<body>
  <div id="duplicate-id">First</div>
  <div id="duplicate-id">Second</div>
</body>
</html>
    `.trim();

    const results = await eslint.lintText(code, { filePath: "test.html" });
    const duplicateIdErrors = results[0].messages.filter(
      (msg) => msg.ruleId === "html/no-duplicate-id",
    );

    expect(duplicateIdErrors.length).toBeGreaterThan(0);
  });

  it("should allow custom templateEngineSyntax configuration", async () => {
    const eslint = await createESLint({
      html: {
        templateEngineSyntax: {
          "<%": "%>",
        },
      },
    });
    const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Test</title>
</head>
<body>
  <div class="<% userClass %>">
    <button id="<% btnId %>" type="button"><% label %></button>
  </div>
</body>
</html>
    `.trim();

    const results = await eslint.lintText(code, { filePath: "test.html" });
    const errors = results[0].messages.filter((msg) => msg.severity === 2);

    expect(errors).toEqual([]);
  });

  it("should allow preset templateEngineSyntax configuration from @html-eslint/parser", async () => {
    const eslint = await createESLint({
      html: {
        templateEngineSyntax: TEMPLATE_ENGINE_SYNTAX.HANDLEBAR_EXTENDED,
      },
    });
    const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Test</title>
</head>
<body>
  {{#if condition}}
    <div id="branch-id">First</div>
  {{else}}
    <div id="branch-id">Second</div>
  {{/if}}
</body>
</html>
    `.trim();

    const results = await eslint.lintText(code, { filePath: "test.html" });
    const duplicateIdErrors = results[0].messages.filter(
      (msg) => msg.ruleId === "html/no-duplicate-id",
    );

    expect(duplicateIdErrors).toHaveLength(0);
  });

  describe("with tailwindcss", () => {
    it("should parse template engine expressions inside class attributes without errors", async () => {
      const eslint = await createESLint({
        html: true,
        tailwindcss: true,
      });
      const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Test</title>
</head>
<body>
  <p class="flex {{ isActive ? 'bg-blue-500' : 'bg-gray-500' }} items-center">
    <span>Content</span>
  </p>
</body>
</html>
      `.trim();

      const results = await eslint.lintText(code, { filePath: "test.html" });
      const fatalErrors = results[0].messages.filter((msg) => msg.fatal);
      const tailwindErrors = results[0].messages.filter((msg) =>
        msg.ruleId?.startsWith("tailwindcss/"),
      );

      expect(fatalErrors).toHaveLength(0);
      expect(tailwindErrors).toHaveLength(0);
    });

    it("should support multiple template delimiters (Twig, Handlebars, ERB) as documented by better-tailwindcss", async () => {
      const eslint = await createESLint({
        html: {
          templateEngineSyntax: [
            { open: "{{", close: "}}" },
            { open: "{%", close: "%}" },
            { open: "<%", close: "%>" },
          ],
        },
        tailwindcss: true,
      });
      const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Test</title>
</head>
<body>
  <div class="flex {{ hasMargin ? 'm-4' : 'm-2' }} items-center">
    {% if isVisible %}
      <span class="text-sm <% customColor %>">Visible</span>
    {% endif %}
  </div>
</body>
</html>
      `.trim();

      const results = await eslint.lintText(code, { filePath: "test.html" });
      const errors = results[0].messages.filter((msg) => msg.severity === 2);

      expect(errors).toHaveLength(0);
    });

    it("should split class attribute into Part and Template tokens for better-tailwindcss parser consumption", async () => {
      const eslintParserHTML = await import("@html-eslint/parser");
      const code = `<p class="flex {{ isActive ? 'bg-blue-500' : 'bg-gray-500' }} items-center"></p>`;

      const parsed = eslintParserHTML.parseForESLint(code, {
        templateEngineSyntax: eslintParserHTML.TEMPLATE_ENGINE_SYNTAX.NUNJUCKS,
      });

      const [tag] = (parsed.ast.body[0] as any).children;
      const classAttr = tag.attributes.find(
        (attr: any) => attr.key.value === "class",
      );

      expect(classAttr).toBeDefined();
      expect(classAttr.value.parts).toBeDefined();

      const partTypes = classAttr.value.parts.map((p: any) => p.type);
      expect(partTypes).toEqual(["Part", "Template", "Part"]);

      const templatePart = classAttr.value.parts.find(
        (p: any) => p.type === "Template",
      );
      expect(templatePart.value).toBe(
        "{{ isActive ? 'bg-blue-500' : 'bg-gray-500' }}",
      );
    });
  });
});
