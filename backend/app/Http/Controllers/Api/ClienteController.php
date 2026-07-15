<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    // Obtener todos los clientes
    public function index()
    {
        $clientes = Cliente::all();
        return response()->json($clientes);
    }

    // Obtener un cliente por su identificación
    public function show($identificacion)
    {
        $cliente = Cliente::find($identificacion);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        return response()->json($cliente);
    }

    // Crear un nuevo cliente
    public function store(Request $request)
    {
        $validated = $request->validate([
            'identificacion' => 'required|unique:clientes|integer',
            'nombreUsuario' => 'required|string|max:255',
            'usuarioHabilitado' => 'required|boolean',
            'haParticipado' => 'required|boolean',
        ]);

        $cliente = Cliente::create($validated);
        return response()->json($cliente, 201);
    }

    // Actualizar un cliente
    public function update(Request $request, $identificacion)
    {
        $cliente = Cliente::find($identificacion);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        $cliente->update($request->all());
        return response()->json($cliente);
    }

    // Eliminar un cliente
    public function destroy($identificacion)
    {
        $cliente = Cliente::find($identificacion);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        $cliente->delete();
        return response()->json(['message' => 'Cliente eliminado']);
    }
}

