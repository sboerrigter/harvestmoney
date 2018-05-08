@extends('layout')

@section('content')
  <div class="columns">
    <div class="column">
      <h1 class="title">
        Projects
      </h1>
    </div>

    <div class="column" style="text-align: right;">
      <a class="button is-warning" href="/projects/create">
        + New project
      </a>
    </div>
  </div>

  @foreach ($projects as $project)
    @include('components/project')
  @endforeach
@endsection
