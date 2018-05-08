@extends('layout')

@section('content')
  <h1 class="title">
    Create project
  </h1>

  <form class="box" method="POST" action="/projects">
    {{ csrf_field() }}

    <div class="field">
      <label class="label">Project name</label>

      <div class="control">
        <input class="input" type="text" name="name">
      </div>
    </div>

    <div class="field">
      <label class="label">Client</label>

      <div class="control">
        <input class="input" type="text" "name="client">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-warning">
          Create project
        </button>
      </div>
    </div>
  </form>

  <a class="button" href="/projects/">
    Back to the projects overview
  </a>
@endsection
