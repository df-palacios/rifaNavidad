<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('premios', function (Blueprint $table) {
            $table->increments('idPremio');
            $table->string('nombrePremio');
            $table->integer('idGanador')->nullable();
            $table->boolean('disponible');
            $table->foreign('idGanador')->references('identificacion')->on('clientes');
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('premios');
    }
};
