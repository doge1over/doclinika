$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$output = Join-Path $root 'Фармакокинетика — блоки и тексты — обновлённый.docx'
$temp = Join-Path $root '.docx-pharmacokinetics-build'
if (Test-Path $temp) { Remove-Item $temp -Recurse -Force }
New-Item -ItemType Directory -Path (Join-Path $temp '_rels'), (Join-Path $temp 'word') -Force | Out-Null

function Escape([string]$value) { [System.Security.SecurityElement]::Escape($value) }
function Paragraph([string]$text, [string]$style = 'body') {
    $safe = Escape $text
    switch ($style) {
        'title' { return "<w:p><w:pPr><w:jc w:val=`"center`"/><w:spacing w:after=`"280`"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val=`"146FA8`"/><w:sz w:val=`"32`"/></w:rPr><w:t>$safe</w:t></w:r></w:p>" }
        'block' { return "<w:p><w:pPr><w:spacing w:before=`"260`" w:after=`"140`"/><w:shd w:fill=`"EAF8FC`"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val=`"146FA8`"/><w:sz w:val=`"25`"/></w:rPr><w:t>$safe</w:t></w:r></w:p>" }
        'heading' { return "<w:p><w:pPr><w:spacing w:before=`"180`" w:after=`"100`"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val=`"F28F20`"/><w:sz w:val=`"22`"/></w:rPr><w:t>$safe</w:t></w:r></w:p>" }
        'bullet' { return "<w:p><w:pPr><w:ind w:left=`"360`" w:hanging=`"240`"/><w:spacing w:after=`"80`"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val=`"F28F20`"/></w:rPr><w:t>• </w:t></w:r><w:r><w:t>$safe</w:t></w:r></w:p>" }
        default { return "<w:p><w:pPr><w:spacing w:after=`"120`"/><w:jc w:val=`"both`"/></w:pPr><w:r><w:t>$safe</w:t></w:r></w:p>" }
    }
}

function Card([string]$title, [string[]]$content, [string]$color = '146FA8') {
    $safeTitle = Escape $title
    $inside = $content -join "`n"
    return @"
<w:tbl>
  <w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders><w:top w:val="single" w:sz="10" w:color="$color"/><w:left w:val="single" w:sz="10" w:color="$color"/><w:bottom w:val="single" w:sz="10" w:color="$color"/><w:right w:val="single" w:sz="10" w:color="$color"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders><w:tblCellMar><w:top w:w="180" w:type="dxa"/><w:left w:w="220" w:type="dxa"/><w:bottom w:w="180" w:type="dxa"/><w:right w:w="220" w:type="dxa"/></w:tblCellMar></w:tblPr>
  <w:tblGrid><w:gridCol w:w="9360"/></w:tblGrid>
  <w:tr><w:tc><w:tcPr><w:shd w:fill="$color"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="24"/></w:rPr><w:t>$safeTitle</w:t></w:r></w:p></w:tc></w:tr>
  <w:tr><w:tc><w:tcPr><w:shd w:fill="FFFFFF"/></w:tcPr>$inside</w:tc></w:tr>
</w:tbl>
<w:p><w:pPr><w:spacing w:after="160"/></w:pPr></w:p>
"@
}

function Arrow {
    return '<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="40" w:after="120"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="14B7E0"/><w:sz w:val="34"/></w:rPr><w:t>↓</w:t></w:r></w:p>'
}

$data = Get-Content (Join-Path $root 'data\research-pharmacokinetics.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$body = [System.Collections.Generic.List[string]]::new()
$body.Add((Paragraph 'Фармакокинетика, токсикокинетика, биоэквивалентность' 'title'))

function Render-DataBlock($item) {
    if ($item.kind -eq 'paragraph') { return ,(Paragraph ([string]$item.text)) }
    elseif ($item.kind -eq 'external-link') { return ,(Paragraph ("$($item.text) $($item.href)")) }
    elseif ($item.kind -eq 'heading') { return ,(Paragraph ([string]$item.text) 'heading') }
    elseif ($item.kind -eq 'list') { return @($item.items | ForEach-Object { Paragraph ([string]$_) 'bullet' }) }
    elseif ($item.kind -eq 'image') { return ,(Paragraph ("Иллюстрация: $($item.caption)")) }
    return @()
}

$intro = @(0..2 | ForEach-Object { Render-DataBlock $data[$_] })
$body.Add((Card 'Ключевая информация и нормативные документы' $intro 'F28F20'))
$body.Add((Arrow))
$groups = @(
    @{ Title='Блок 1. Направления и методы исследований'; From=3; To=8 },
    @{ Title='Блок 2. Доклиническая фармакокинетика in vivo'; From=10; To=16 },
    @{ Title='Блок 3. Фармакокинетические исследования in vitro (ADME)'; From=18; To=22 },
    @{ Title='Блок 4. Доклиническая токсикокинетика'; From=24; To=28 },
    @{ Title='Блок 5. Исследования биоэквивалентности'; From=30; To=33 }
)
$groupIndex = 0
foreach ($group in $groups) {
    $content = @($group.From..$group.To | ForEach-Object { Render-DataBlock $data[$_] })
    $color = if ($groupIndex % 2 -eq 0) { '146FA8' } else { 'F28F20' }
    $body.Add((Card $group.Title $content $color))
    if ($groupIndex -lt ($groups.Count - 1)) { $body.Add((Arrow)) }
    $groupIndex++
}
$body.Add((Arrow))
$body.Add((Card 'PKSolver' @(
    (Paragraph 'Расчёт фармакокинетических параметров с использованием валидированного приложения PKSolver для Microsoft Office Excel.')
) '146FA8'))
$body.Add((Arrow))
$body.Add((Card 'Отчёт' @(
    (Paragraph 'Результаты исследования, рассчитанные фармакокинетические параметры и их интерпретация оформляются в итоговый отчёт.')
) 'F28F20'))

$contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'
$rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
$document = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + ($body -join "`n") + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="850" w:right="1100" w:bottom="850" w:left="1100"/></w:sectPr></w:body></w:document>'
$utf8 = [System.Text.UTF8Encoding]::new($false)
[IO.File]::WriteAllText((Join-Path $temp '[Content_Types].xml'), $contentTypes, $utf8)
[IO.File]::WriteAllText((Join-Path $temp '_rels\.rels'), $rels, $utf8)
[IO.File]::WriteAllText((Join-Path $temp 'word\document.xml'), $document, $utf8)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = "$output.zip"
if (Test-Path $zip) { Remove-Item $zip -Force }
if (Test-Path $output) { Remove-Item $output -Force }
$archive = [IO.Compression.ZipFile]::Open($zip, [IO.Compression.ZipArchiveMode]::Create)
Get-ChildItem $temp -File -Recurse | ForEach-Object {
    $name = $_.FullName.Substring($temp.Length + 1).Replace('\', '/')
    [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $_.FullName, $name) | Out-Null
}
$archive.Dispose()
Move-Item $zip $output
Remove-Item $temp -Recurse -Force
Write-Output $output
