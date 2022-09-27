import {
  Tree,
  formatFiles,
  updateJson,
  getProjects,
  ProjectConfiguration,
} from '@nrwl/devkit';

function getScopes(projectMap: Map<string, ProjectConfiguration>) {
  const projects: any[] = Array.from(projectMap.values());
  const allScopes: string[] = projects
    .map((project) =>
      project.tags.filter((tag: string) => tag.startsWith('scope:'))
    )
    .reduce((acc, tags) => [...acc, ...tags], [])
    .map((scope: string) => scope.slice(6));
  return Array.from(new Set(allScopes));
}

function replaceScopes(content: string, scopes: string[]): string {
  const joinScopes = scopes.map((s) => `'${s}'`).join(' | ');
  const PATTERN = /interface Schema \{\n.*\n.*\n\}/gm;
  return content.replace(
    PATTERN,
    `interface Schema {
      name: string;
      directory: ${joinScopes};
    }`
  );
}

export default async function (tree: Tree) {
  const scopes = getScopes(getProjects(tree));
  // updateJson(tree, 'nx.json', (json) => {
  //   json.defaultProject = 'api';
  //   return json;
  // });

  updateJson(tree, 'tools/generators/util-lib/schema.json', (schemaJson) => {
    schemaJson.properties.directory['x-prompt'].items = scopes.map((scope) => ({
      value: scope,
      label: scope,
    }));
    return schemaJson;
  });

  const content = tree.read('tools/generators/util-lib/index.ts', 'utf-8');
  if (content) {
    const newContent = replaceScopes(content, scopes);
    tree.write('tools/generators/util-lib/index.ts', newContent);
  }

  await formatFiles(tree);
}
