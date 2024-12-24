<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Premio extends Model
{
    use HasFactory;

    // Especificar qué campos pueden ser asignados de manera masiva
    protected $fillable = [
        'nombrePremio',
        'idGanador',
        'disponible',
    ];

    // Relación con el modelo Cliente (si un premio tiene un ganador)
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'idGanador', 'identificacion');
    }

    // Si deseas agregar la fecha de creación y actualización:
    protected $dates = ['created_at', 'updated_at'];
}
