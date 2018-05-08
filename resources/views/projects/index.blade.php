@extends('layout')

@section('content')
  <h1 class="title">
    Projects
  </h1>

  @foreach ($projects as $project)
    <li>
      <a href="/projects/{{ $project->id }}">
        {{ $project->name }}
      </a>
    </li>
  @endforeach
@endsection
