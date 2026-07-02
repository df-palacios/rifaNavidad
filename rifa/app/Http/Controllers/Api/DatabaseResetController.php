<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DatabaseResetController extends Controller
{
    public function reset()
    {
        try {

            $path = database_path('sql/rifa.sql');

            if (!file_exists($path)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se encontró el archivo SQL.'
                ], 500);
            }

            $sql = file_get_contents($path);

            DB::statement('SET FOREIGN_KEY_CHECKS=0');

            // Eliminar todas las tablas existentes
            DB::statement('DROP TABLE IF EXISTS premios');
            DB::statement('DROP TABLE IF EXISTS clientes');
            DB::statement('DROP TABLE IF EXISTS personal_access_tokens');
            DB::statement('DROP TABLE IF EXISTS password_resets');
            DB::statement('DROP TABLE IF EXISTS failed_jobs');
            DB::statement('DROP TABLE IF EXISTS migrations');
            DB::statement('DROP TABLE IF EXISTS users');

            DB::statement('SET FOREIGN_KEY_CHECKS=1');

            // Ejecutar nuevamente el dump completo
            DB::unprepared($sql);

            return response()->json([
                'success' => true
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);

        }
    }
}