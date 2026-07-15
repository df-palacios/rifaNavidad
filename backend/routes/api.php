<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\PremioController;
use App\Http\Controllers\Api\DatabaseResetController;


// Rutas para clientes
Route::get('clientes', [ClienteController::class, 'index']);
Route::get('clientes/{identificacion}', [ClienteController::class, 'show']);
Route::post('clientes', [ClienteController::class, 'store']);
Route::put('clientes/{identificacion}', [ClienteController::class, 'update']);
Route::delete('clientes/{identificacion}', [ClienteController::class, 'destroy']);

// Rutas para premios
Route::get('premios', [PremioController::class, 'index']);
Route::get('premios/{idPremio}', [PremioController::class, 'show']);
Route::put('premios/{idPremio}', [PremioController::class, 'update']);


Route::post('reset-db', [DatabaseResetController::class, 'reset']);
