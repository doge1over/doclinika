$ErrorActionPreference = 'Stop'

function Escape-Xml([string]$Value) {
    if ($null -eq $Value) { return '' }
    return [System.Security.SecurityElement]::Escape($Value)
}

function Get-ColumnName([int]$Number) {
    $name = ''
    while ($Number -gt 0) {
        $Number--
        $name = [char](65 + ($Number % 26)) + $name
        $Number = [math]::Floor($Number / 26)
    }
    return $name
}

function New-SheetXml($Rows, [int[]]$Widths) {
    $maxColumns = ($Rows | ForEach-Object { $_.Count } | Measure-Object -Maximum).Maximum
    $lastCell = "$(Get-ColumnName $maxColumns)$($Rows.Count)"
    $columns = for ($i = 0; $i -lt $Widths.Count; $i++) {
        $index = $i + 1
        "<col min=`"$index`" max=`"$index`" width=`"$($Widths[$i])`" customWidth=`"1`"/>"
    }
    $rowXml = for ($r = 0; $r -lt $Rows.Count; $r++) {
        $cells = for ($c = 0; $c -lt $Rows[$r].Count; $c++) {
            $reference = "$(Get-ColumnName ($c + 1))$($r + 1)"
            $style = if ($r -eq 0) { 1 } else { 2 }
            $value = Escape-Xml ([string]$Rows[$r][$c])
            "<c r=`"$reference`" s=`"$style`" t=`"inlineStr`"><is><t xml:space=`"preserve`">$value</t></is></c>"
        }
        "<row r=`"$($r + 1)`">$($cells -join '')</row>"
    }
    @" 
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="A1:$lastCell"/>
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>$($columns -join '')</cols>
  <sheetData>$($rowXml -join '')</sheetData>
  <autoFilter ref="A1:$lastCell"/>
</worksheet>
"@
}

$glpRows = @(
    @('№', 'Путь', 'Название страницы', 'Статус'),
    @('1', '/', 'Главная', 'Готово'),
    @('2', '/consultant', 'Консультант', 'Готово'),
    @('3', '/registration', 'Регистрация', 'Готово'),
    @('4', '/archive', 'Архив конференций', 'Готово'),
    @('5', '/archive/2020', 'Конференция 2020 (I)', 'Готово'),
    @('6', '/archive/2021', 'Конференция 2021 (II)', 'Готово'),
    @('7', '/archive/2022', 'Конференция 2022 (III)', 'Готово'),
    @('8', '/archive/2023', 'Конференция 2023 (IV)', 'Готово'),
    @('9', '/archive/2024', 'Конференция 2024 (V)', 'Готово'),
    @('10', '/archive/2025', 'Конференция 2025 (VI)', 'Готово'),
    @('11', '/contacts', 'Контакты', 'Готово'),
    @('12', '/broadcast', 'Трансляция', 'Есть в проекте'),
    @('13', '/schedule', 'Программа', 'Есть в проекте'),
    @('14', '/admin/login', 'Админ → Вход', 'Административная'),
    @('15', '/admin/program', 'Админ → Управление программой', 'Административная')
)

$titles = @{
    '/' = 'Главная'
    '/o-nas' = 'О нас'
    '/kontakty' = 'Контакты'
    '/vakansii' = 'Вакансии'
    '/doklinicheskie-issledovaniya' = 'Доклинические исследования'
    '/immunogennost-aktivnost' = 'Иммуногенность и активность'
    '/mikrobiologicheskaya-laboratoriya' = 'Отдел микробиологии'
    '/farmacevticheskaya-razrabotka' = 'Фармацевтическая разработка'
    '/gruppa-biohimii-i-gematologii' = 'Отдел лабораторной диагностики'
    '/gruppa-gistologii-i-patomorfologii' = 'Лаборатория гистологии и патоморфологии'
    '/laboratornye-zhivotnye' = 'Лабораторные животные'
    '/farmakokinetika' = 'Фармакокинетика'
    '/oborudovanie-otdela' = 'Оборудование отдела'
    '/innovatsionnaya-deyatelnost' = 'Инновационная деятельность'
    '/obespechenie-kachestva' = 'Обеспечение качества'
    '/provizorskaya-sluzhba' = 'Провизорская служба'
    '/spetsialisty' = 'Специалисты'
    '/policy' = 'Политики'
    '/politika-obrabotki-personalnyh-dannyh' = 'Политика обработки персональных данных'
    '/soglasie-na-obrabotku-personalnyh-dannyh' = 'Согласие на обработку персональных данных'
    '/politika-cookie' = 'Политика использования cookies и сторонних технологий'
    '/litsenzii-sertifikaty-udostovereniya' = 'Лицензии, сертификаты, удостоверения'
    '/glavnaya' = 'Сведения об образовательной организации'
    '/category/news' = 'Новости'
    '/category/news/[id]' = 'Страница новости (динамическая)'
    '/zayavka-doklinicheskie' = 'Заявка на доклинические исследования'
    '/zayavka-nir' = 'Заявка на НИР'
    '/admin/import' = 'Админ → Импорт новостей'
    '/admin/news' = 'Админ → Управление новостями'
    '/glavnaya/kontakty' = 'Образование → Контакты'
    '/glavnaya/svedeniya-ob-obrazovatelnoj-organizacii' = 'Образование → Сведения'
    '/innovatsionnaya-deyatelnost/doklinicheskie-issledovaniya-farmakokinetiki' = 'Инновации → Фармакокинетика'
    '/innovatsionnaya-deyatelnost/doklinicheskie-issledovaniya-toksikokinetiki' = 'Инновации → Токсикокинетика'
    '/innovatsionnaya-deyatelnost/issledovanie-bioekvivalentnosti-preparatov-v-klinicheskih-issledovaniyah-analiticheskaya-chast' = 'Инновации → Биоэквивалентность'
    '/innovatsionnaya-deyatelnost/izuchenie-farmakokineticheskih-pokazatelej-substancij-v-in-vitro-sistemah' = 'Инновации → In vitro'
}

$projectRoot = $PSScriptRoot
$pageFiles = Get-ChildItem -LiteralPath (Join-Path $projectRoot 'app') -Recurse -Filter 'page.tsx' | Sort-Object FullName

$docRows = [System.Collections.ArrayList]::new()
[void]$docRows.Add(@('№', 'Путь', 'Название страницы', 'Статус', 'Файл в проекте'))
$index = 0
foreach ($file in $pageFiles) {
    $relativeDirectory = $file.DirectoryName.Substring((Join-Path $projectRoot 'app').Length).TrimStart('\')
    $route = if ([string]::IsNullOrWhiteSpace($relativeDirectory)) { '/' } else { '/' + ($relativeDirectory -replace '\\', '/') }
    $index++
    $title = if ($titles.ContainsKey($route)) { $titles[$route] } else { ($route.Trim('/') -replace '-', ' ') }
    $relativeFile = $file.FullName.Substring($projectRoot.Length + 1)
    $status = if ($route.StartsWith('/admin/')) { 'Административная' } else { 'Есть в проекте' }
    [void]$docRows.Add(@([string]$index, $route, $title, $status, $relativeFile))
}

$newsFile = Join-Path $projectRoot 'data\news.json'
$newsItems = Get-Content -Raw -Encoding UTF8 -LiteralPath $newsFile | ConvertFrom-Json
foreach ($news in $newsItems) {
    $index++
    $route = "/category/news/$($news.id)"
    $newsTitle = if ([string]::IsNullOrWhiteSpace([string]$news.title)) { "Новость $($news.id)" } else { [string]$news.title }
    [void]$docRows.Add(@([string]$index, $route, $newsTitle, 'Есть в данных проекта', "data\news.json; дата: $($news.date)"))
}

$summaryRows = @(
    @('Проект', 'Количество страниц', 'Источник проверки'),
    @('ДЖЛП', [string]($glpRows.Count - 1), 'Файл glp-planet-pages-1 (1).xlsx и проверка проекта glp-planet'),
    @('Доклиника', [string]($docRows.Count - 1), "Все app/**/page.tsx, включая /admin, и $($newsItems.Count) страниц новостей из data/news.json"),
    @('Всего', [string](($glpRows.Count - 1) + ($docRows.Count - 1)), 'Два проекта')
)

$output = Join-Path $projectRoot 'Страницы_ДЖЛП_и_Доклиника.xlsx'
$tempRoot = Join-Path $projectRoot '.xlsx-build'
if (Test-Path -LiteralPath $tempRoot) { Remove-Item -LiteralPath $tempRoot -Recurse -Force }
New-Item -ItemType Directory -Path "$tempRoot\_rels", "$tempRoot\docProps", "$tempRoot\xl\_rels", "$tempRoot\xl\worksheets" -Force | Out-Null

$contentTypes = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>
'@
$rootRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>
'@
$workbook = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Сводка" sheetId="1" r:id="rId1"/><sheet name="ДЖЛП" sheetId="2" r:id="rId2"/><sheet name="Доклиника" sheetId="3" r:id="rId3"/></sheets></workbook>
'@
$workbookRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet3.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>
'@
$styles = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF1F4E78"/><bgColor indexed="64"/></patternFill></fill><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs></styleSheet>
'@
$core = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:creator>Codex</dc:creator><dc:title>Страницы ДЖЛП и Доклиника</dc:title></cp:coreProperties>'
$app = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Microsoft Excel</Application></Properties>'

$utf8 = [Text.UTF8Encoding]::new($false)
[IO.File]::WriteAllText("$tempRoot\[Content_Types].xml", $contentTypes, $utf8)
[IO.File]::WriteAllText("$tempRoot\_rels\.rels", $rootRels, $utf8)
[IO.File]::WriteAllText("$tempRoot\xl\workbook.xml", $workbook, $utf8)
[IO.File]::WriteAllText("$tempRoot\xl\_rels\workbook.xml.rels", $workbookRels, $utf8)
[IO.File]::WriteAllText("$tempRoot\xl\styles.xml", $styles, $utf8)
[IO.File]::WriteAllText("$tempRoot\xl\worksheets\sheet1.xml", (New-SheetXml $summaryRows @(22, 20, 48)), $utf8)
[IO.File]::WriteAllText("$tempRoot\xl\worksheets\sheet2.xml", (New-SheetXml $glpRows @(7, 24, 38, 16)), $utf8)
[IO.File]::WriteAllText("$tempRoot\xl\worksheets\sheet3.xml", (New-SheetXml $docRows @(7, 78, 55, 18, 100)), $utf8)
[IO.File]::WriteAllText("$tempRoot\docProps\core.xml", $core, $utf8)
[IO.File]::WriteAllText("$tempRoot\docProps\app.xml", $app, $utf8)

if (Test-Path -LiteralPath $output) { Remove-Item -LiteralPath $output -Force }
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::Open($output, [IO.Compression.ZipArchiveMode]::Create)
try {
    Get-ChildItem -LiteralPath $tempRoot -Recurse -File | ForEach-Object {
        $entryName = $_.FullName.Substring($tempRoot.Length + 1).Replace('\', '/')
        [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $_.FullName, $entryName, [IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
} finally {
    $archive.Dispose()
}
Remove-Item -LiteralPath $tempRoot -Recurse -Force
Write-Output $output
