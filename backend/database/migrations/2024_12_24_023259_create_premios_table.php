<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('premios', function (Blueprint $table) {
            $table->increments('idPremio'); // Llave primaria con autoincremento
            $table->string('nombrePremio');
            $table->integer('idGanador')->nullable(); // Llave foránea que corresponde a clientes.identificacion
            $table->boolean('disponible');
            $table->foreign('idGanador')->references('identificacion')->on('clientes')->onDelete('set null'); // Relación con la tabla clientes
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('premios');
    }
};
