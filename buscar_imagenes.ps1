# Script para buscar imágenes de zapatillas
# Probando múltiples fuentes para cada zapatilla sin imagen

$baseUrl = "https://ballershoesdb.com/wp-content/uploads/"
$urls = @()

$zapatillasSinImagen = @(
    "Nike-JA-1",
    "Adidas-Trae-Young-3",
    "NB-TWO-WXY-v5",
    "Nike-GT-Hustle-3",
    "NB-Kawhi-2",
    "Adidas-Trae-Young-4",
    "Jordan-Tatum-2",
    "Jordan-Zion-3",
    "UA-Curry-11",
    "Puma-Clyde-All-Pro",
    "Nike-LeBron-NXXT-Gen",
    "Jordan-Luka-3",
    "Nike-GT-Jump-3",
    "Adidas-Harden-Vol-9",
    "Adidas-Cross-Em-Up-Select",
    "Nike-Precision-8",
    "Decathlon-Tarmak-Voltzy-500",
    "Puma-MB-03",
    "Converse-Run-Star-Alt-Pro",
    "Reebok-Fast-Foam-Intercept-3",
    "Li-Ning-Any-Pro-1",
    "Anta-KAI-1-Speed",
    "Peak-Pegasus-8",
    "Teva-Hike-2",
    "Hoka-One-1",
    "Adidas-Di-6",
    "Nike-Lunar-Regulator-2",
    "Nike-Be-1",
    "Nike-Curry-11",
    "Reebok-Kinetic-2",
    "Under-Armer-02",
    "Adidas-Durango-2",
    "Nike-Zoom-Strike-3",
    "Adidas-Durango-1",
    "Li-Ning-Any-Pro-3",
    "Anta-Kai-3",
    "Reebok-Kinetic-3",
    "Jordan-Zion-2",
    "Converse-Madness-JV-2022",
    "Under-Armer-HoVR-X-3",
    "Under-Armer-01",
    "Nike-LeBron-XV",
    "Nike-Jordan-Luka-1",
    "Jordan-Paul-6",
    "Under-Armer-07",
    "Under-Armer-08",
    "Jordan-Zion-1",
    "Converse-Run-Star-94-V2",
    "Jordan-Tatum-3",
    "Converse-Charge-83",
    "Jordan-Why-Not-6",
    "Adidas-Ownthegame-2",
    "Jordan-2-GabrixAJ-4",
    "Jordan-Luka-2",
    "Adidas-Prophecy-3",
    "Adidas-Prophecy-2",
    "Nike-Zoom-X-Invincible-05",
    "Jordan-Zion-4",
    "Jordan-2-GabrixAJ-2",
    "Under-Armer-Curry-11",
    "Jordan-2-GabrixAJ-3",
    "Jordan-2-GabrixAJ-1",
    "Reebok-Kinetic-4",
    "Adidas-Durango-V2",
    "Jordan-37-GabrixAJ-2",
    "Converse-Madness-JV-3",
    "Under-Armer-03",
    "Under-Armer-04",
    "Under-Armer-05",
    "Under-Armer-06",
    "Jordan-Zion-5",
    "Jordan-37-GabrixAJ-1",
    "Jordan-2-GabrixAJ-5",
    "Jordan-2-GabrixAJ-6",
    "Nike-Jordans-3",
    "Adidas-Durango-V3",
    "Converse-Madness-JV-4",
    "Under-Armer-09",
    "Jordan-2-GabrixAJ-7",
    "Under-Armer-10",
    "Jordan-Luka-4",
    "Adidas-Prophecy-4",
    "Converse-Run-Star-Alt-Pro-2",
    "Adidas-Durango-V4",
    "Under-Armer-11",
    "Under-Armer-12",
    "Jordan-Luka-5",
    "Jordan-2-GabrixAJ-8",
    "Under-Armer-13",
    "Under-Armer-14",
    "Jordan-2-GabrixAJ-9",
    "Under-Armer-15",
    "Jordan-2-GabrixAJ-10",
    "Adidas-Durango-V5",
    "Converse-Madness-JV-5",
    "Under-Armer-16",
    "Under-Armer-17",
    "Under-Armer-18",
    "Jordan-Luka-6",
    "Under-Armer-19",
    "Under-Armer-20",
    "Under-Armer-21",
    "Under-Armer-22",
    "Under-Armer-23",
    "Under-Armer-24",
    "Under-Armer-25",
    "Under-Armer-26",
    "Under-Armer-27",
    "Under-Armer-28",
    "Under-Armer-29",
    "Under-Armer-30",
    "Under-Armer-31",
    "Under-Armer-32",
    "Under-Armer-33",
    "Under-Armer-34",
    "Under-Armer-35",
    "Under-Armer-36",
    "Under-Armer-37",
    "Under-Armer-38",
    "Under-Armer-39",
    "Under-Armer-40",
    "Under-Armer-41",
    "Under-Armer-42",
    "Under-Armer-43",
    "Under-Armer-44",
    "Under-Armer-45",
    "Under-Armer-46",
    "Under-Armer-47",
    "Under-Armer-48",
    "Under-Armer-49",
    "Under-Armer-50",
)

foreach ($z in $zapatillasSinImagen) {
    $url = $baseUrl + $z + "-Cropped-650x406.jpg"
    $headers = @{}
    $headers["User-Agent"] = "Mozilla/5.0"
    $headers["Accept"] = "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"

    try {
        $response = Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing -TimeoutSec 5
        $statusCode = [int]$response.StatusCode

        if ($statusCode -eq 200) {
            $urls += "[OK] $z -> $url"
            Write-Host "[OK] $z" -ForegroundColor Green
        } elseif ($statusCode -eq 404) {
            $urls += "[404] $z -> No existe"
            Write-Host "[404] $z" -ForegroundColor Yellow
        } elseif ($statusCode -eq 403) {
            $urls += "[403] $z -> Bloqueado"
            Write-Host "[403] $z" -ForegroundColor Red
        } else {
            $urls += "[ERR] $z -> HTTP $statusCode"
            Write-Host "[ERR] $z" -ForegroundColor Cyan
        }
    } catch {
        $urls += "[ERR] $z -> Error: $_"
        Write-Host "[ERR] $z" -ForegroundColor DarkRed
    }

    Write-Host "Procesado: $($urls.Count) de $($zapatillasSinImagen.Count)"
}

$urls | Out-File -FilePath "imagenes_encontradas.txt" -Encoding utf8
Write-Host "`nResultado guardado en imagenes_encontradas.txt" -ForegroundColor Green
