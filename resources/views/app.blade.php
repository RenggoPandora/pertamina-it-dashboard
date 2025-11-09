<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" 
      @class(['dark' => ($appearance ?? 'system') == 'dark'])>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Deteksi mode gelap otomatis --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? "system" }}';
            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Warna latar default --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }
        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    {{-- ===== FAVICON & LOGO ICON SETUP ===== --}}
    <!-- SVG utama -->
    <link rel="icon" type="image/svg+xml" href="{{ asset('pertamina.svg') }}">
    <!-- PNG fallback -->
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('pertamina.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('pertamina.png') }}">
    <!-- Apple touch icon -->
    <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">
    <!-- Shortcut icon (kompatibilitas lama) -->
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    {{-- ===== FONT & STYLING ===== --}}
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    {{-- ===== REACT + VITE SETUP ===== --}}
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>
</html>
