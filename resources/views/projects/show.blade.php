@extends('layout')

@section('content')
    <h1>
      {{ $project->name }}
    </h1>

    <a href="/projects/">
      Back to the projects overview
    </a>
@endsection
