<?php
Route::get('/', 'projectController@index');
Route::get('/projects', 'projectController@index');
Route::post('/projects', 'projectController@store');
Route::get('/projects/create', 'projectController@create');
Route::get('/projects/{project}', 'projectController@show');
