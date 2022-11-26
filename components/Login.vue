<template>
    <div class="login">
        <form>
            <h3>Ingresar</h3>
            <div class="form-group">
                <label>Correo</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Contraseña</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Ingresar</button>
            <p class="text-right mt-2 mb-4">Registrarse</p>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style scoped>
.login{
    width: 20%;
    margin-left: auto;
    margin-right: auto;
}
</style>