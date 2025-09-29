<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <meta name="description"
        content="WEHLO is a localized weather, environment, and hydromet monitoring platform providing 24/7 real-time data on temperature, humidity, rainfall, wind, and air quality to support communities, disaster preparedness, and climate resilience.">
    <meta name="keywords"
        content="weather monitoring Philippines,WEHLO system,environmental monitoring,hydromet data,real-time weather data,disaster risk management,climate,resilience ,tools,localized, weather, platform,air, quality, monitoring,rainfall, tracking,community, weather ,stations">

    <meta property="og:title" content="WEHLO – Real-Time Weather & Environmental Monitoring System in the Philippines">
    <meta property="og:description"
        content="WEHLO is a localized weather, environment, and hydromet monitoring platform providing 24/7 real-time data on temperature, humidity, rainfall, wind, and air quality to support communities, disaster preparedness, and climate resilience.">
    <meta property="og:image" content="{{ asset('images/metas/thumbnail.webp') }}">
    <meta property="og:thumbnail" content="{{ asset('images/metas/thumbnail.webp') }}" />
    <meta property="og:type" content="website">
    <meta property="og:site_name"
        content="WEHLO – Real-Time Weather & Environmental Monitoring System in the Philippines" />
    <meta property="og:locale" content="en_US" />

    <link rel="icon" href="{{ asset('images/metas/favicon.ico') }}" type="image/x-icon" />
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('tas/apple-touch-icon.png') }}" />
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/metas/favicon-32x32.png') }}" />
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/metas/favicon-16x16.png') }}" />
    <link rel="icon" type="image/png" sizes="192x192"
        href="{{ asset('images/metas/android-chrome-192x192.png') }}" />
    <link rel="icon" type="image/png" sizes="512x512"
        href="{{ asset('images/metas/android-chrome-512x512.png') }}" />
    <link rel="manifest" href="{{ asset('images/metas/site.webmanifest') }}">


    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Cormorant:ital,wght@0,300..700;1,300..700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Dancing+Script:wght@400..700&family=Ephesis&family=Golos+Text:wght@400..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Trykker&display=swap"
        rel="stylesheet">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <script src="https://cdn.ckeditor.com/ckeditor5/34.2.0/super-build/ckeditor.js"></script>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased golos-text">
    @inertia
</body>

<style>
    .golos-text {
        font-family: "Golos Text", sans-serif;
        font-style: normal;
    }
</style>

</html>
