import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config:ConfigFile = {
    schemaFile: 'https://todos-be.vercel.app/api-json',
    apiFile: './src/rtkApi/rootApi.ts',
    apiImport: 'rtkApi',
    outputFile: './src/rtkApi/todoApi.ts',
    exportName: 'todoApi',
    hooks: true,
    useEnumType: true,
    tag: true,
}

export default config