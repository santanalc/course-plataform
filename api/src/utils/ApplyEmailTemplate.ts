export function applyTemplate(text: string, object: any) {
  let templateText = text;

  Object.keys(object).forEach((key) => {
    const keyOnTemplate = `{{${key}}}`;
    const value = object[key];

    if (`${value}`.includes(keyOnTemplate))
      throw new Error(
        `Can't apply template, the key ${key} is a substring of the value ${value}`
      );

    while (templateText.includes(keyOnTemplate))
      templateText = templateText.replace(keyOnTemplate, value);
  });

  return templateText;
}
