import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import type { Permission } from './auth'

export type ManagedSection = Exclude<Permission, 'news'>
export type ContentItem = Record<string, unknown> & { id: string; title?: string }
const FILE = path.join(process.cwd(), 'data', 'managed-content.json')
const SECTIONS: ManagedSection[] = ['education', 'documents', 'specialists', 'animals', 'about']
const sources: Record<ManagedSection, { file: string; variables: string[] }> = {
  documents: { file: 'app/litsenzii-sertifikaty-udostovereniya/page.tsx', variables: ['documents'] },
  specialists: { file: 'app/spetsialisty/page.tsx', variables: ['leadership','vetService','departmentHeads','supportServices'] },
  animals: { file: 'app/laboratornye-zhivotnye/page.tsx', variables: ['animals','facilities'] },
  about: { file: 'app/o-nas/page.tsx', variables: ['events'] },
  education: { file: 'app/glavnaya/svedeniya-ob-obrazovatelnoj-organizacii/page.tsx', variables: [] },
}

export function isSection(value: string): value is ManagedSection { return SECTIONS.includes(value as ManagedSection) }
function literal(node: ts.Expression): unknown {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(e => literal(e as ts.Expression))
  if (ts.isObjectLiteralExpression(node)) {
    const result: Record<string,unknown> = {}
    for (const p of node.properties) if (ts.isPropertyAssignment(p)) {
      const key = ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) ? p.name.text : p.name.getText()
      result[key] = literal(p.initializer)
    }
    return result
  }
  return node.getText()
}
function seed(section: ManagedSection): ContentItem[] {
  if (section === 'education') {
    const files=['app/glavnaya/page.tsx','app/glavnaya/svedeniya-ob-obrazovatelnoj-organizacii/page.tsx']; const items:ContentItem[]=[]; const seen=new Set<string>()
    for(const relative of files) { const source=fs.readFileSync(path.join(process.cwd(),relative),'utf8'); const pattern=/<a\s+href="(https:\/\/doclinika\.ru\/wp-content\/uploads\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g; let match:RegExpExecArray|null
      while((match=pattern.exec(source))) { const url=match[1]; if(seen.has(url)) continue; seen.add(url); const title=match[2].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim(); items.push({id:`seed-education-${items.length}`,title,url,originalUrl:url}) }
    }
    return items
  }
  const configs = section === 'documents' ? [sources.documents, {file:'app/policy/page.tsx',variables:['policies','laborProtectionDocs']}] : [sources[section]]
  try {
    const items: ContentItem[] = []
    for (const source of configs) {
    const file = path.join(process.cwd(), source.file)
    const ast = ts.createSourceFile(file, fs.readFileSync(file,'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    ast.forEachChild(node => {
      if (!ts.isVariableStatement(node)) return
      for (const d of node.declarationList.declarations) {
        if (!ts.isIdentifier(d.name) || !source.variables.includes(d.name.text) || !d.initializer || !ts.isArrayLiteralExpression(d.initializer)) continue
        const variableName = d.name.text
        d.initializer.elements.forEach((el,index) => {
          const value = literal(el as ts.Expression) as Record<string,unknown>
          items.push({ id: `seed-${variableName}-${index}`, _group: variableName, ...value })
        })
      }
    })
    }
    return items
  } catch { return [] }
}
export function readStored(): Partial<Record<ManagedSection, ContentItem[]>> { try { return JSON.parse(fs.readFileSync(FILE,'utf8')) } catch { return {} } }
export function readSection(section: ManagedSection) { const stored=readStored(); return Object.prototype.hasOwnProperty.call(stored,section) ? stored[section] || [] : seed(section) }
export function saveSection(section: ManagedSection, items: ContentItem[]) {
  const all=readStored(); all[section]=items; fs.mkdirSync(path.dirname(FILE),{recursive:true})
  const temp=`${FILE}.${process.pid}.tmp`; fs.writeFileSync(temp,JSON.stringify(all,null,2),'utf8'); fs.renameSync(temp,FILE)
}
