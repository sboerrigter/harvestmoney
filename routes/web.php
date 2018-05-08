<?php
Route::get('/', 'projectController@index');
Route::get('/projects/', 'projectController@index');
Route::get('/projects/{project}/', 'projectController@show');
