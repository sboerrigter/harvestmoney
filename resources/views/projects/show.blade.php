@extends('layout')

@section('content')
  <h1 class="title">
    {{ $project->name }}
  </h1>

  <a class="button is-warning" href="/projects/">
    Back to the projects overview
  </a>
@endsection
