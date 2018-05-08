@extends('layout')

@section('content')
  <h1 class="title">
    Projects
  </h1>

  @foreach ($projects as $project)
    <div class="box">
      <h2 class="subtitle">
        {{ $project->name }}
      </h2>

      <a class="button is-warning" href="/projects/{{ $project->id }}">
        View project
      </a>
    </div>
  @endforeach
@endsection
