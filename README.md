{ line: 1, type: 'heading', depth: 1, text: 'Mermaiddown' }
{
  line: 3,
  type: 'paragraph',
  text: 'Mermaiddown is a wrapper for [mermaid.cli] that targets markdown. Markdown files get parsed, and fenced mermaid code blocks\n' +
    '(`\\`\\`\\`mermaid \\`\\`\\``) get replaced with their corresponding mermaid diagrams in SVG format.'
}
{
  line: 4,
  type: 'paragraph',
  text: 'Inspired by the amazing concepts underlying the visual studio plugin [Markdown Preview Mermaid Support].'
}
{
  line: 6,
  type: 'paragraph',
  text: 'This operates slightly differently from other similar packages in that the SVGs are embedded into the output\n' +
    'HTML. This means that links in the diagram are clickable :)'
}
{
  line: 16,
  type: 'code',
  lang: 'mermaid',
  text: 'graph TD;\n' +
    '    a["mermaiddown"];\n' +
    '    click a "#mermaiddown";\n' +
    '    b["is"];\n' +
    '    c["cool!"];\n' +
    '\n' +
    '    a --> b;\n' +
    '    b --> c;'
}
