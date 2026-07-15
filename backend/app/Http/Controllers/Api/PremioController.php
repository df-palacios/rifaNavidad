<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Premio;
use Illuminate\Http\Request;

class PremioController extends Controller
{
    // Obtener todos los premios
    public function index()
    {
        $premios = Premio::all();
        return response()->json($premios);
    }

    // Obtener un premio específico
    public function show($idPremio)
    {
        $premio = Premio::find($idPremio);

        if (!$premio) {
            return response()->json(['message' => 'Premio no encontrado'], 404);
        }

        return response()->json($premio);
    }

    // Actualizar un premio
    public function update(Request $request, $idPremio)
    {
        $premio = Premio::find($idPremio);

        if (!$premio) {
            return response()->json(['message' => 'Premio no encontrado'], 404);
        }

        $premio->update($request->all());
        return response()->json($premio);
    }
}
