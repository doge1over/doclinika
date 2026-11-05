$ErrorActionPreference = 'Stop'

$outputPath = Join-Path $PSScriptRoot 'Фармацевтическая разработка.docx'
$tempPath = Join-Path $PSScriptRoot '.docx-pharma-build'

if (Test-Path -LiteralPath $tempPath) {
    Remove-Item -LiteralPath $tempPath -Recurse -Force
}

$folders = @(
    $tempPath,
    (Join-Path $tempPath '_rels'),
    (Join-Path $tempPath 'docProps'),
    (Join-Path $tempPath 'word'),
    (Join-Path $tempPath 'word\_rels')
)
$folders | ForEach-Object { New-Item -ItemType Directory -Path $_ -Force | Out-Null }

function Write-Utf8File([string]$Path, [string]$Content) {
    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
}

function Escape-Xml([string]$Value) {
    if ($null -eq $Value) { return '' }
    return [System.Security.SecurityElement]::Escape($Value)
}

$pageData = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'data\research-development.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$introText = ($pageData | Where-Object { $_.kind -eq 'paragraph' } | Select-Object -First 1).text
$stages = ($pageData | Where-Object { $_.kind -eq 'list' } | Select-Object -First 1).items
$publicationsBlock = $pageData | Where-Object { $_.kind -eq 'publications' } | Select-Object -First 1

$detailsXml = for ($stageIndex = 0; $stageIndex -lt $stages.Count; $stageIndex++) {
    $stageNumber = $stageIndex + 1
    $stageText = Escape-Xml ([string]$stages[$stageIndex])
    @"
    <w:p>
      <w:pPr><w:spacing w:before="90" w:after="90"/><w:keepNext/></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="00A6C8"/><w:sz w:val="20"/></w:rPr><w:t>$stageNumber. </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="19"/></w:rPr><w:t>$stageText</w:t></w:r>
    </w:p>
"@
}

$publicationsXml = for ($publicationIndex = 0; $publicationIndex -lt $publicationsBlock.items.Count; $publicationIndex++) {
    $publicationNumber = $publicationIndex + 1
    $publicationText = Escape-Xml ([string]$publicationsBlock.items[$publicationIndex])
    @"
    <w:p>
      <w:pPr><w:spacing w:after="100"/><w:ind w:left="420" w:hanging="420"/></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="F28F20"/><w:sz w:val="18"/></w:rPr><w:t>$publicationNumber. </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:t>$publicationText</w:t></w:r>
    </w:p>
"@
}

$contentTypes = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
'@

$rootRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
'@

$documentRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
</Relationships>
'@

$styles = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos" w:cs="Aptos"/><w:sz w:val="20"/><w:szCs w:val="20"/><w:color w:val="243247"/></w:rPr></w:rPrDefault>
    <w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
</w:styles>
'@

$settings = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:zoom w:percent="100"/><w:defaultTabStop w:val="708"/><w:compat/>
</w:settings>
'@

$core = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Фармацевтическая разработка</dc:title>
  <dc:creator>АО «НПО «ДОМ ФАРМАЦИИ»</dc:creator>
  <dc:subject>Этапы фармацевтической разработки</dc:subject>
  <dcterms:created xsi:type="dcterms:W3CDTF">2026-09-02T00:00:00Z</dcterms:created>
</cp:coreProperties>
'@

$app = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Office Word</Application><AppVersion>16.0000</AppVersion>
</Properties>
'@

$document = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:after="100"/></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="00A6C8"/><w:sz w:val="34"/><w:szCs w:val="34"/></w:rPr><w:t>РАЗРАБОТКА ЛЕКАРСТВЕННЫХ ФОРМ</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:after="180"/></w:pPr>
      <w:r><w:rPr><w:color w:val="526173"/><w:sz w:val="19"/></w:rPr><w:t>{{INTRO_TEXT}}</w:t></w:r>
    </w:p>
    <w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="140"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="243247"/></w:rPr><w:t>Мы выполняем следующие элементы фармацевтической разработки:</w:t></w:r></w:p>

    <w:tbl>
      <w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="120" w:type="dxa"/><w:left w:w="180" w:type="dxa"/><w:bottom w:w="120" w:type="dxa"/><w:right w:w="180" w:type="dxa"/></w:tblCellMar></w:tblPr>
      <w:tblGrid><w:gridCol w:w="780"/><w:gridCol w:w="8580"/></w:tblGrid>

      <w:tr><w:trPr><w:trHeight w:val="620" w:hRule="atLeast"/></w:trPr>
        <w:tc><w:tcPr><w:tcW w:w="780" w:type="dxa"/><w:shd w:fill="00A6C8"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="24"/></w:rPr><w:t>1</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="8580" w:type="dxa"/><w:shd w:fill="E9F8FB"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr><w:t>Информационная проработка</w:t></w:r><w:r><w:br/><w:rPr><w:color w:val="526173"/><w:sz w:val="18"/></w:rPr><w:t>Анализ темы и исходных данных научно-исследовательской работы</w:t></w:r></w:p></w:tc>
      </w:tr>
    </w:tbl>
    <w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="12" w:after="12"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="F28F20"/><w:sz w:val="26"/></w:rPr><w:t>↓</w:t></w:r></w:p>

    <w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="110" w:type="dxa"/><w:left w:w="180" w:type="dxa"/><w:bottom w:w="110" w:type="dxa"/><w:right w:w="180" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="780"/><w:gridCol w:w="8580"/></w:tblGrid>
      <w:tr><w:trPr><w:trHeight w:val="720" w:hRule="atLeast"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="780" w:type="dxa"/><w:shd w:fill="14B7E0"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="24"/></w:rPr><w:t>2</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8580" w:type="dxa"/><w:shd w:fill="EEF9FC"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr><w:t>Преформуляционные исследования</w:t></w:r><w:r><w:br/><w:rPr><w:color w:val="526173"/><w:sz w:val="17"/></w:rPr><w:t>Свойства и стабильность АФС · аналитические методики · выбор вспомогательных веществ</w:t></w:r></w:p></w:tc></w:tr>
    </w:tbl>
    <w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="12" w:after="12"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="F28F20"/><w:sz w:val="26"/></w:rPr><w:t>↓</w:t></w:r></w:p>

    <w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="110" w:type="dxa"/><w:left w:w="180" w:type="dxa"/><w:bottom w:w="110" w:type="dxa"/><w:right w:w="180" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="780"/><w:gridCol w:w="8580"/></w:tblGrid>
      <w:tr><w:trPr><w:trHeight w:val="820" w:hRule="atLeast"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="780" w:type="dxa"/><w:shd w:fill="00A6C8"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="24"/></w:rPr><w:t>3</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8580" w:type="dxa"/><w:shd w:fill="E9F8FB"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr><w:t>Лабораторный этап разработки</w:t></w:r><w:r><w:br/><w:rPr><w:color w:val="526173"/><w:sz w:val="17"/></w:rPr><w:t>Совместимость компонентов · состав и технология ЛФ · высвобождение in vitro · первичная упаковка</w:t></w:r></w:p></w:tc></w:tr>
    </w:tbl>
    <w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="12" w:after="12"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="F28F20"/><w:sz w:val="26"/></w:rPr><w:t>↓</w:t></w:r></w:p>

    <w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="110" w:type="dxa"/><w:left w:w="180" w:type="dxa"/><w:bottom w:w="110" w:type="dxa"/><w:right w:w="180" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="780"/><w:gridCol w:w="8580"/></w:tblGrid>
      <w:tr><w:trPr><w:trHeight w:val="720" w:hRule="atLeast"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="780" w:type="dxa"/><w:shd w:fill="14B7E0"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="24"/></w:rPr><w:t>4</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8580" w:type="dxa"/><w:shd w:fill="EEF9FC"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr><w:t>Наработка лекарственной формы</w:t></w:r><w:r><w:br/><w:rPr><w:color w:val="526173"/><w:sz w:val="17"/></w:rPr><w:t>Образцы для подтверждения разработки, аналитики, стабильности и доклинических исследований</w:t></w:r></w:p></w:tc></w:tr>
    </w:tbl>
    <w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="12" w:after="12"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="F28F20"/><w:sz w:val="26"/></w:rPr><w:t>↓</w:t></w:r></w:p>

    <w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="110" w:type="dxa"/><w:left w:w="180" w:type="dxa"/><w:bottom w:w="110" w:type="dxa"/><w:right w:w="180" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="780"/><w:gridCol w:w="8580"/></w:tblGrid>
      <w:tr><w:trPr><w:trHeight w:val="700" w:hRule="atLeast"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="780" w:type="dxa"/><w:shd w:fill="00A6C8"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="24"/></w:rPr><w:t>5</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8580" w:type="dxa"/><w:shd w:fill="E9F8FB"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr><w:t>Исследования стабильности</w:t></w:r><w:r><w:br/><w:rPr><w:color w:val="526173"/><w:sz w:val="17"/></w:rPr><w:t>Долгосрочные, промежуточные и ускоренные исследования АФС и готовой ЛФ</w:t></w:r></w:p></w:tc></w:tr>
    </w:tbl>
    <w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="12" w:after="12"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="F28F20"/><w:sz w:val="26"/></w:rPr><w:t>↓</w:t></w:r></w:p>

    <w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="120" w:type="dxa"/><w:left w:w="180" w:type="dxa"/><w:bottom w:w="120" w:type="dxa"/><w:right w:w="180" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="780"/><w:gridCol w:w="8580"/></w:tblGrid>
      <w:tr><w:trPr><w:trHeight w:val="650" w:hRule="atLeast"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="780" w:type="dxa"/><w:shd w:fill="F28F20"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="24"/></w:rPr><w:t>6</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8580" w:type="dxa"/><w:shd w:fill="FFF2E4"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:sz w:val="21"/><w:color w:val="A8550D"/></w:rPr><w:t>Проект нормативного документа</w:t></w:r><w:r><w:br/><w:rPr><w:color w:val="6B4A2D"/><w:sz w:val="18"/></w:rPr><w:t>Составление проекта НД на АФС и готовую лекарственную форму</w:t></w:r></w:p></w:tc></w:tr>
    </w:tbl>

    <w:p><w:pPr><w:pageBreakBefore/><w:spacing w:after="160"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="00A6C8"/><w:sz w:val="28"/></w:rPr><w:t>Полное описание этапов</w:t></w:r></w:p>
    {{DETAILS_XML}}
    <w:p><w:pPr><w:pageBreakBefore/><w:spacing w:after="180"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="00A6C8"/><w:sz w:val="30"/></w:rPr><w:t>Публикации по теме</w:t></w:r></w:p>
    {{PUBLICATIONS_XML}}
    <w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="680" w:right="1273" w:bottom="680" w:left="1273" w:header="360" w:footer="360"/><w:cols w:space="708"/><w:docGrid w:linePitch="360"/></w:sectPr>
  </w:body>
</w:document>
'@

$document = $document.Replace('{{INTRO_TEXT}}', (Escape-Xml ([string]$introText)))
$document = $document.Replace('{{DETAILS_XML}}', ($detailsXml -join "`n"))
$document = $document.Replace('{{PUBLICATIONS_XML}}', ($publicationsXml -join "`n"))

Write-Utf8File (Join-Path $tempPath '[Content_Types].xml') $contentTypes
Write-Utf8File (Join-Path $tempPath '_rels\.rels') $rootRels
Write-Utf8File (Join-Path $tempPath 'word\_rels\document.xml.rels') $documentRels
Write-Utf8File (Join-Path $tempPath 'word\styles.xml') $styles
Write-Utf8File (Join-Path $tempPath 'word\settings.xml') $settings
Write-Utf8File (Join-Path $tempPath 'word\document.xml') $document
Write-Utf8File (Join-Path $tempPath 'docProps\core.xml') $core
Write-Utf8File (Join-Path $tempPath 'docProps\app.xml') $app

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "$outputPath.zip"
if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
if (Test-Path -LiteralPath $outputPath) { Remove-Item -LiteralPath $outputPath -Force }
$archive = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
Get-ChildItem -LiteralPath $tempPath -File -Recurse | ForEach-Object {
    $relativeName = $_.FullName.Substring($tempPath.Length + 1).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
        $archive,
        $_.FullName,
        $relativeName,
        [System.IO.Compression.CompressionLevel]::Optimal
    ) | Out-Null
}
$archive.Dispose()
Move-Item -LiteralPath $zipPath -Destination $outputPath
Remove-Item -LiteralPath $tempPath -Recurse -Force

Write-Output $outputPath
