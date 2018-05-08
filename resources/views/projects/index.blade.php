@extends('layout')

@section('content')
  @foreach ($projects as $project)
    <li>
      <a href="/projects/{{ $project->id }}">{{ $project->name }}</a>
    </li>
  @endforeach
@endsection
