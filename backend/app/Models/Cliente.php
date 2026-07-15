<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    // Especificar qué campos pueden ser asignados de manera masiva
    protected $fillable = [
        'identificacion',
        'nombreUsuario',
        'usuarioHabilitado',
        'haParticipado',
    ];

    // Definir la clave primaria
    protected $primaryKey = 'identificacion';
    public $incrementing = false; // La clave primaria no es autoincremental

    // Si deseas agregar la fecha de creación y actualización:
    protected $dates = ['created_at', 'updated_at'];
}
