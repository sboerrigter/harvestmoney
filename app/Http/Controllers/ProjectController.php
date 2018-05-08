<?php

namespace App\Http\Controllers;

use App\Project;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();

        return view('projects/index', compact('projects'));
    }

    public function show(Project $project)
    {
        return view('projects/show', compact('project'));
    }
}
