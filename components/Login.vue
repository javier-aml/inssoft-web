<template>
    <div class="login-form">
        <b-form @submit.stop.prevent>
            <b-form-group
                id="login-username"
            >
                <b-form-input
                    type="text"
                    placeholder="Nombre de usuario:"
                    required
                    oninvalid="this.setCustomValidity('Ingresa tu nombre usuario')"
                    oninput="setCustomValidity('')"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="login-password"
            >
                <b-form-input
                    type="password"
                    placeholder="Contraseña:"
                    required
                    oninvalid="this.setCustomValidity('Ingresa tu contraseña')"
                    oninput="setCustomValidity('')"
                ></b-form-input>
            </b-form-group>
            <b-button 
                block
                type="submit"
                variant="primary"
            >
            Ingresar
            </b-button>
        </b-form>
        <b-link
            class="float-right mt-1"
            to="/register"
        >Registrarse</b-link>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
.login-form{
    display: block;
    max-width: 300px;
    min-width: 200px;
}
</style>