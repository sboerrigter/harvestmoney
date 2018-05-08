<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <title>Harvest Money</title>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="{{ URL::asset('../node_modules/bulma/css/bulma.css') }}">
    </head>
    <body>
        @include('components/header')
        @yield('content')
    </body>
</html>
