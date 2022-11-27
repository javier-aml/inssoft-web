<template>
    <div class="register-form">
        <b-form @submit.prevent="registerUser">
            <b-form-group
                id="register-name"
                label="Nombre:" 
                :disabled="userRegistered || registerRunning"
            >
                <b-form-input
                    type="text"
                    placeholder="Nombre"
                    required
                    v-model="name"
                    :state="validateName"
                    oninvalid="this.setCustomValidity('Ingresa tu nombre')"
                    oninput="this.setCustomValidity('')"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="register-last-name"
                label="Apellidos:"
                :disabled="userRegistered || registerRunning"
            >
                <b-form-input
                    type="text"
                    placeholder="Appelidos"
                    required
                    v-model="lastName"
                    :state="validateLastName"
                    oninvalid="this.setCustomValidity('Ingresa tus apellidos')"
                    oninput="this.setCustomValidity('')"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="register-gender"
                label="Género:"
                :disabled="userRegistered || registerRunning"
            >
                <b-form-radio-group
                    id="register-gender-group"
                    required
                    v-model="gender"
                    :state="validateGender"
                >
                    <b-form-radio
                        value="1"
                        oninvalid="this.setCustomValidity('Ingresa tu género')"
                        oninput="this.setCustomValidity('')"
                    >Masculino</b-form-radio>
                    <b-form-radio value="2">Femenino</b-form-radio>
                    <b-form-radio value="3">Transgénero</b-form-radio>
                    <b-form-radio value="4">No binario</b-form-radio>
                    <b-form-radio value="5">Prefiero no responder</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
            <b-form-group
                id="register-phone-number"
                label="Número de teléfono:"
                :disabled="userRegistered || registerRunning"
            >
                <b-form-input
                    type="number"
                    placeholder="Número de teléfono"
                    required
                    v-model="phoneNumber"
                    :state="validatePhoneNumber"
                    oninvalid="this.setCustomValidity('Ingresa tu número de teléfono')"
                    oninput="this.setCustomValidity('')"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="register-email"
                label="Correo electrónico:"
                :disabled="userRegistered || registerRunning"
            >
                <b-form-input
                    type="email"
                    placeholder="Correo electrónico"
                    required
                    v-model="email"
                    :state="validateEmail"
                    oninvalid="this.setCustomValidity('Ingresa tu correo electrónico')"
                    oninput="this.setCustomValidity('')"
                ></b-form-input>
                <b-form-invalid-feedback :state="validateEmail">
                    {{emailExists ? 'El correo ingresado ya existe.' : 'El formato del correo electrónico es incorrecto.'}}
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                id="register-password"
                label="Contraseña:"
                :disabled="userRegistered || registerRunning"
            >
                <b-form-input
                    type="password"
                    placeholder="Contraseña"
                    required
                    v-model="password"
                    :state="validatePassword"
                    oninvalid="this.setCustomValidity('Ingresa tu contraseña')"
                    oninput="this.setCustomValidity('')"
                ></b-form-input>
                <b-form-text 
                    id="password-help-block"
                    v-show="validatePassword === null"
                >
                    <p>{{notes.passwordValidation[1]}}</p>
                    <ul>
                        <li v-for="i in 4" :key="i">{{notes.passwordValidation[i + 1]}}</li>
                    </ul>
                </b-form-text>
                <b-form-valid-feedback :state="validatePassword">
                    <p>{{notes.passwordValidation[1]}}</p>
                    <ul>
                        <li v-for="i in 4" :key="i">{{notes.passwordValidation[i + 1]}}</li>
                    </ul>
                </b-form-valid-feedback>
                <b-form-invalid-feedback :state="validatePassword">
                    <p>{{notes.passwordValidation[1]}}</p>
                    <ul>
                        <li :style="validatePasswordLength() ? 'color: green;' : 'color: red;'">{{notes.passwordValidation[1]}}</li>
                        <li :style="validatePasswordAlphanumeric() ? 'color: green;' : 'color: red;'">{{notes.passwordValidation[2]}}</li>
                        <li :style="validatePasswordMixedCase() ? 'color: green;' : 'color: red;'">{{notes.passwordValidation[3]}}</li>
                        <li :style="validatePasswordSpecialCharacters() ? 'color: green;' : 'color: red;'">{{notes.passwordValidation[4]}}</li>
                    </ul>
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                id="register-password-confirm"
                label="Confirmar contraseña:"
                :disabled="userRegistered || registerRunning"
            >
                <b-form-input
                    type="password"
                    placeholder="Confirmar contraseña"
                    required
                    v-model="passwordConfirm"
                    :state="validatePasswordConfirm"
                    oninvalid="this.setCustomValidity('Ingresa la confirmación de la contraseña')"
                    oninput="this.setCustomValidity('')"
                ></b-form-input>
                <b-form-invalid-feedback :state="validatePasswordConfirm">
                    Las contraseñas no coinciden.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-button 
                block
                type="submit"
                :variant="userRegistered ? 'outline-success' : 'primary'"
                :disabled="userRegistered || registerRunning"
                v-show="!registerRunning"
            >
            {{userRegistered ? 'Usuario registrado' : 'Registrarse'}}
            </b-button>
            <div 
                style="dispaly: block; text-align: center;"
                v-show="registerRunning"
            >
                <b-spinner variant="primary" label="Spinning"></b-spinner>
                <span style="margin-left:10px; position: relative; top:-5px">Registrando usuario..</span>
            </div>
        </b-form>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                name: null,
                lastName: null,
                gender: null,
                phoneNumber: null,
                email: null,
                password: null,
                passwordConfirm: null,
                emailExists: false,
                userRegistered: false ,
                registerRunning: false,
                notes: {
                    passwordValidation: {
                        1: 'La contraseña debe cumplir con los siguientes requisitos:',
                        2: 'Debe tener una longitud de 8 a 20 caractéres.',
                        3:  'Debe tener numeros y letras.',
                        4: 'Debe tener al menos una letra en minúscula y una en mayúscula.',
                        5: 'No debe tener espacios o caractéres especiales.'
                    }
                }
            }
        },
        methods: {
            validatePasswordLength(){
                if (!this.password) return;
                return (this.password.length >= 8 && this.password.length <= 20) ? true : false;
            },
            validatePasswordAlphanumeric(){
                if (!this.password) return;
                const alphaRegex = /[a-zA-Z]+/;
                const numericRegex = /[0-9]+/;
                return this.password.match(alphaRegex) && this.password.match(numericRegex) ? true : false;
            },
            validatePasswordMixedCase(){
                if (!this.password) return;
                const loweCaseRegex = /[a-z]+/;
                const upperCaseRegex = /[A-Z]+/;
                return this.password.match(loweCaseRegex) && this.password.match(upperCaseRegex) ? true : false;
            },
            validatePasswordSpecialCharacters(){
                if (!this.password) return;
                const alphanumericRegex = /^[0-9a-zA-Z]+$/;
                return this.password.match(alphanumericRegex) ? true : false;
            }
            ,async validateEmailExist(){
                try {
                    let response = await fetch(`${this.$config.API_URL}/users?email=${this.email}`);
                    response = await response.json();
                    if (response.length > 0) this.emailExists = true;
                } catch(err) {
                    alert('Ocurrió un error en la aplicación');
                }
            },
            async registerUser(){
                this.registerRunning = true;
                if (await this.validateEmailExist()) {
                    this.registerRunning = false;
                };
                const userData = {
                    name: this.name,
                    last_names: this.lastName,
                    gender_id: this.gender,
                    telephone_number: this.phoneNumber,
                    email: this.email,
                    password: this.password
                };
                try{
                    await this.$store.dispatch('registerUser', userData);
                    this.userRegistered = true;
                    this.registerRunning = false;
                }catch(error){
                    alert('Ocurrió un error en la aplicación');
                    this.registerRunning = false;
                    return;
                }
            }
        },
        computed: {
            validateName(){
                if (!this.name) return null;
                else return this.name ? true : false;
            },
            validateLastName(){
                if (!this.lastName) return null
                else return this.lastName ? true : false;
            },
            validateGender(){
                if (!this.gender) return null
                else return this.gender ? true : false;
            },
            validatePhoneNumber(){
                if (!this.phoneNumber) return null
                else return this.phoneNumber ? true : false;
            },
            validateEmail() {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!this.email) return null;
                else if(this.emailExists) return false;
                else return this.email.match(emailRegex) ? true : false;
            },
            validatePassword() {
                if (!this.password) return null;
                else if (
                    !this.validatePasswordLength() ||
                    !this.validatePasswordAlphanumeric() ||
                    !this.validatePasswordMixedCase() ||
                    !this.validatePasswordSpecialCharacters()
                ) return false;
                else return true;
            },
            validatePasswordConfirm() {
                if (!this.passwordConfirm) return null
                return this.password === this.passwordConfirm ? true : false;
            }
        }
    }
</script>

<style scoped>
.register-form{
    display: block;
    max-width: 700px;
    min-width: 200px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
}
</style>