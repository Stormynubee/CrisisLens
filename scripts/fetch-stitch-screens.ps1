# Fetch Stitch screen HTML + PNG for CrisisLens Document Annotator project.
# Reads API key from ~/.cursor/mcp.json (stitch server). Run from repo root.

$ErrorActionPreference = 'Stop'
$projectId = '7792652003124684155'
$outRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\docs\stitch')).Path
$mcpPath = Join-Path $env:USERPROFILE '.cursor\mcp.json'
$key = (Get-Content $mcpPath | ConvertFrom-Json).mcpServers.stitch.headers.'X-Goog-Api-Key'

$screens = @(
    @{ slug = 'landing-page';       screenId = '0fb7040850ab4aaf9549fc9732e905fd'; title = 'CrisisLens - Landing Page' },
    @{ slug = 'document-viewer';    screenId = 'c3c86cdb915942398f1c486b38832a2c'; title = 'CrisisLens - Document Viewer' },
    @{ slug = 'onboarding-splash'; screenId = '99e150039cb44e77bba229e1e23ad5f8'; title = 'CrisisLens - Onboarding Splash' }
)

function Invoke-StitchTool {
    param([string]$Tool, [hashtable]$Arguments)
    $body = @{
        jsonrpc = '2.0'
        id      = 1
        method  = 'tools/call'
        params  = @{ name = $Tool; arguments = $Arguments }
    } | ConvertTo-Json -Depth 10 -Compress
    $resp = Invoke-RestMethod -Uri 'https://stitch.googleapis.com/mcp' -Method Post `
        -Headers @{ 'Content-Type' = 'application/json'; 'X-Goog-Api-Key' = $key } -Body $body
    if ($resp.error) { throw ($resp.error | ConvertTo-Json -Depth 6) }
    if ($resp.result.isError) {
        $msg = ($resp.result.content | Where-Object { $_.type -eq 'text' } | Select-Object -First 1).text
        throw "Stitch $Tool failed: $msg"
    }
    if ($resp.result.structuredContent) { return $resp.result.structuredContent }
    $text = ($resp.result.content | Where-Object { $_.type -eq 'text' } | Select-Object -First 1).text
    return ($text | ConvertFrom-Json)
}

New-Item -ItemType Directory -Force -Path $outRoot | Out-Null

# Design system (not a screen — use list_design_systems)
Write-Host 'Fetching Design System...'
$dsDir = Join-Path $outRoot 'design-system'
New-Item -ItemType Directory -Force -Path $dsDir | Out-Null
$dsList = Invoke-StitchTool -Tool 'list_design_systems' -Arguments @{ projectId = $projectId }
$ds = $dsList.designSystems | Select-Object -First 1
if (-not $ds) { throw 'No design system found for project' }
$theme = $ds.designSystem.theme
$meta = @{
    projectId   = $projectId
    assetId     = 'asset-stub-assets_6a76395b87bd4605b9d64fa53978e741'
    name        = $ds.name
    displayName = $ds.designSystem.displayName
    version     = $ds.version
} | ConvertTo-Json -Depth 4
Set-Content -Path (Join-Path $dsDir 'meta.json') -Value $meta -Encoding utf8
Set-Content -Path (Join-Path $dsDir 'style-guidelines.md') -Value $ds.designSystem.styleGuidelines -Encoding utf8
if ($theme.designMd) {
    Set-Content -Path (Join-Path $dsDir 'DESIGN.md') -Value $theme.designMd -Encoding utf8
}
$theme | ConvertTo-Json -Depth 12 | Set-Content -Path (Join-Path $dsDir 'theme.json') -Encoding utf8
Write-Host '  DESIGN.md, style-guidelines.md, theme.json'

foreach ($s in $screens) {
    $dir = Join-Path $outRoot $s.slug
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "Fetching $($s.title)..."

    $screen = Invoke-StitchTool -Tool 'get_screen' -Arguments @{
        name      = "projects/$projectId/screens/$($s.screenId)"
        projectId = $projectId
        screenId  = $s.screenId
    }

    $meta = @{
        projectId  = $projectId
        screenId   = $s.screenId
        title      = $screen.title
        width      = $screen.width
        height     = $screen.height
        deviceType = $screen.deviceType
    } | ConvertTo-Json -Depth 4
    Set-Content -Path (Join-Path $dir 'meta.json') -Value $meta -Encoding utf8

    $htmlUrl = $screen.htmlCode.downloadUrl
    $imgUrl  = $screen.screenshot.downloadUrl

    if ($htmlUrl) {
        curl.exe -fsSL -o (Join-Path $dir 'screen.html') $htmlUrl
        Write-Host '  screen.html'
    }
    if ($imgUrl) {
        curl.exe -fsSL -o (Join-Path $dir 'screenshot.png') $imgUrl
        Write-Host '  screenshot.png'
    }
}

Write-Host "Done. Assets in $outRoot"
