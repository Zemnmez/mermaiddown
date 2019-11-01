# Mermaiddown
Mermaiddown is a wrapper for [mermaid.cli] that targets markdown. Markdown files get parsed, and fenced mermaid code blocks
(`\`\`\`mermaid \`\`\``) get replaced with their corresponding mermaid diagrams in SVG format.

Inspired by the amazing concepts underlying the visual studio plugin [Markdown Preview Mermaid Support].

This operates slightly differently from other similar packages in that the SVGs are embedded into the output
HTML. This means that links in the diagram are clickable :)

<svg id="mermaid-1572651664270" width="100%" xmlns="http://www.w3.org/2000/svg" style="max-width: 137.546875px;" viewBox="0 0 137.546875 233"><style>#mermaid-1572651664270 .label{font-family:trebuchet ms,verdana,arial;color:#333}#mermaid-1572651664270 .node circle,#mermaid-1572651664270 .node ellipse,#mermaid-1572651664270 .node polygon,#mermaid-1572651664270 .node rect{fill:#ececff;stroke:#9370db;stroke-width:1px}#mermaid-1572651664270 .node.clickable{cursor:pointer}#mermaid-1572651664270 .arrowheadPath{fill:#333}#mermaid-1572651664270 .edgePath .path{stroke:#333;stroke-width:1.5px}#mermaid-1572651664270 .edgeLabel{background-color:#e8e8e8}#mermaid-1572651664270 .cluster rect{fill:#ffffde!important;stroke:#aa3!important;stroke-width:1px!important}#mermaid-1572651664270 .cluster text{fill:#333}#mermaid-1572651664270 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:trebuchet ms,verdana,arial;font-size:12px;background:#ffffde;border:1px solid #aa3;border-radius:2px;pointer-events:none;z-index:100}#mermaid-1572651664270 .actor{stroke:#ccf;fill:#ececff}#mermaid-1572651664270 text.actor{fill:#000;stroke:none}#mermaid-1572651664270 .actor-line{stroke:grey}#mermaid-1572651664270 .messageLine0{marker-end:"url(#arrowhead)"}#mermaid-1572651664270 .messageLine0,#mermaid-1572651664270 .messageLine1{stroke-width:1.5;stroke-dasharray:"2 2";stroke:#333}#mermaid-1572651664270 #arrowhead{fill:#333}#mermaid-1572651664270 #crosshead path{fill:#333!important;stroke:#333!important}#mermaid-1572651664270 .messageText{fill:#333;stroke:none}#mermaid-1572651664270 .labelBox{stroke:#ccf;fill:#ececff}#mermaid-1572651664270 .labelText,#mermaid-1572651664270 .loopText{fill:#000;stroke:none}#mermaid-1572651664270 .loopLine{stroke-width:2;stroke-dasharray:"2 2";marker-end:"url(#arrowhead)";stroke:#ccf}#mermaid-1572651664270 .note{stroke:#aa3;fill:#fff5ad}#mermaid-1572651664270 .noteText{fill:#000;stroke:none;font-family:trebuchet ms,verdana,arial;font-size:14px}#mermaid-1572651664270 .section{stroke:none;opacity:.2}#mermaid-1572651664270 .section0{fill:rgba(102,102,255,.49)}#mermaid-1572651664270 .section2{fill:#fff400}#mermaid-1572651664270 .section1,#mermaid-1572651664270 .section3{fill:#fff;opacity:.2}#mermaid-1572651664270 .sectionTitle0,#mermaid-1572651664270 .sectionTitle1,#mermaid-1572651664270 .sectionTitle2,#mermaid-1572651664270 .sectionTitle3{fill:#333}#mermaid-1572651664270 .sectionTitle{text-anchor:start;font-size:11px;text-height:14px}#mermaid-1572651664270 .grid .tick{stroke:#d3d3d3;opacity:.3;shape-rendering:crispEdges}#mermaid-1572651664270 .grid path{stroke-width:0}#mermaid-1572651664270 .today{fill:none;stroke:red;stroke-width:2px}#mermaid-1572651664270 .task{stroke-width:2}#mermaid-1572651664270 .taskText{text-anchor:middle;font-size:11px}#mermaid-1572651664270 .taskTextOutsideRight{fill:#000;text-anchor:start;font-size:11px}#mermaid-1572651664270 .taskTextOutsideLeft{fill:#000;text-anchor:end;font-size:11px}#mermaid-1572651664270 .taskText0,#mermaid-1572651664270 .taskText1,#mermaid-1572651664270 .taskText2,#mermaid-1572651664270 .taskText3{fill:#fff}#mermaid-1572651664270 .task0,#mermaid-1572651664270 .task1,#mermaid-1572651664270 .task2,#mermaid-1572651664270 .task3{fill:#8a90dd;stroke:#534fbc}#mermaid-1572651664270 .taskTextOutside0,#mermaid-1572651664270 .taskTextOutside1,#mermaid-1572651664270 .taskTextOutside2,#mermaid-1572651664270 .taskTextOutside3{fill:#000}#mermaid-1572651664270 .active0,#mermaid-1572651664270 .active1,#mermaid-1572651664270 .active2,#mermaid-1572651664270 .active3{fill:#bfc7ff;stroke:#534fbc}#mermaid-1572651664270 .activeText0,#mermaid-1572651664270 .activeText1,#mermaid-1572651664270 .activeText2,#mermaid-1572651664270 .activeText3{fill:#000!important}#mermaid-1572651664270 .done0,#mermaid-1572651664270 .done1,#mermaid-1572651664270 .done2,#mermaid-1572651664270 .done3{stroke:grey;fill:#d3d3d3;stroke-width:2}#mermaid-1572651664270 .doneText0,#mermaid-1572651664270 .doneText1,#mermaid-1572651664270 .doneText2,#mermaid-1572651664270 .doneText3{fill:#000!important}#mermaid-1572651664270 .crit0,#mermaid-1572651664270 .crit1,#mermaid-1572651664270 .crit2,#mermaid-1572651664270 .crit3{stroke:#f88;fill:red;stroke-width:2}#mermaid-1572651664270 .activeCrit0,#mermaid-1572651664270 .activeCrit1,#mermaid-1572651664270 .activeCrit2,#mermaid-1572651664270 .activeCrit3{stroke:#f88;fill:#bfc7ff;stroke-width:2}#mermaid-1572651664270 .doneCrit0,#mermaid-1572651664270 .doneCrit1,#mermaid-1572651664270 .doneCrit2,#mermaid-1572651664270 .doneCrit3{stroke:#f88;fill:#d3d3d3;stroke-width:2;cursor:pointer;shape-rendering:crispEdges}#mermaid-1572651664270 .activeCritText0,#mermaid-1572651664270 .activeCritText1,#mermaid-1572651664270 .activeCritText2,#mermaid-1572651664270 .activeCritText3,#mermaid-1572651664270 .doneCritText0,#mermaid-1572651664270 .doneCritText1,#mermaid-1572651664270 .doneCritText2,#mermaid-1572651664270 .doneCritText3{fill:#000!important}#mermaid-1572651664270 .titleText{text-anchor:middle;font-size:18px;fill:#000}#mermaid-1572651664270 g.classGroup text{fill:#9370db;stroke:none;font-family:trebuchet ms,verdana,arial;font-size:10px}#mermaid-1572651664270 g.classGroup rect{fill:#ececff;stroke:#9370db}#mermaid-1572651664270 g.classGroup line{stroke:#9370db;stroke-width:1}#mermaid-1572651664270 .classLabel .box{stroke:none;stroke-width:0;fill:#ececff;opacity:.5}#mermaid-1572651664270 .classLabel .label{fill:#9370db;font-size:10px}#mermaid-1572651664270 .relation{stroke:#9370db;stroke-width:1;fill:none}#mermaid-1572651664270 #compositionEnd,#mermaid-1572651664270 #compositionStart{fill:#9370db;stroke:#9370db;stroke-width:1}#mermaid-1572651664270 #aggregationEnd,#mermaid-1572651664270 #aggregationStart{fill:#ececff;stroke:#9370db;stroke-width:1}#mermaid-1572651664270 #dependencyEnd,#mermaid-1572651664270 #dependencyStart,#mermaid-1572651664270 #extensionEnd,#mermaid-1572651664270 #extensionStart{fill:#9370db;stroke:#9370db;stroke-width:1}#mermaid-1572651664270 .branch-label,#mermaid-1572651664270 .commit-id,#mermaid-1572651664270 .commit-msg{fill:#d3d3d3;color:#d3d3d3}</style><style>#mermaid-1572651664270 {
    color: rgb(0, 0, 0);
    font: normal normal 400 normal 16px / normal "Times New Roman";
  }</style><g transform="translate(-12, -12)"><g class="output"><g class="clusters"></g><g class="edgePaths"><g class="edgePath" style="opacity: 1;"><path class="path" d="M80.7734375,59L80.7734375,84L80.7734375,109" marker-end="url(#arrowhead12)" style="fill:none"></path><defs><marker id="arrowhead12" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowheadPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker></defs></g><g class="edgePath" style="opacity: 1;"><path class="path" d="M80.7734375,148L80.7734375,173L80.7734375,198" marker-end="url(#arrowhead13)" style="fill:none"></path><defs><marker id="arrowhead13" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowheadPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker></defs></g></g><g class="edgeLabels"><g class="edgeLabel" style="opacity: 1;" transform=""><g transform="translate(0,0)" class="label"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" style="opacity: 1;" transform=""><g transform="translate(0,0)" class="label"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node clickable" id="a" transform="translate(80.7734375,39.5)" style="opacity: 1;"><rect rx="0" ry="0" x="-60.7734375" y="-19.5" width="121.546875" height="39"></rect><g class="label" transform="translate(0,0)"><g transform="translate(-50.7734375,-9.5)"><foreignObject width="101.546875" height="19"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;">mermaiddown</div></foreignObject></g></g></g><g class="node" id="b" transform="translate(80.7734375,128.5)" style="opacity: 1;"><rect rx="0" ry="0" x="-15.5234375" y="-19.5" width="31.046875" height="39"></rect><g class="label" transform="translate(0,0)"><g transform="translate(-5.5234375,-9.5)"><foreignObject width="11.046875" height="19"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;">is</div></foreignObject></g></g></g><g class="node" id="c" transform="translate(80.7734375,217.5)" style="opacity: 1;"><rect rx="0" ry="0" x="-27.84375" y="-19.5" width="55.6875" height="39"></rect><g class="label" transform="translate(0,0)"><g transform="translate(-17.84375,-9.5)"><foreignObject width="35.6875" height="19"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;">cool!</div></foreignObject></g></g></g></g></g></g></svg>

[mermaid.cli]: https://npm.com/package/mermaid.cli
[Markdown Preview Mermaid Support]: https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid
