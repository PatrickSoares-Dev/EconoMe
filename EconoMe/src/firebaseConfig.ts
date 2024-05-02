import { current } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router";

const config ={
    apiKey: "AIzaSyAoUPIZkiRXKuxIcamm7d1-TJCSueErSSQ",
    authDomain: "econome-a7c35.firebaseapp.com",
    projectId: "econome-a7c35",
    storageBucket: "econome-a7c35.appspot.com",
    messagingSenderId: "279961740036",
    appId: "1:279961740036:web:b79e54543c84ff3675a651",
    measurementId: "G-WDWDN6Z9SM"
}
const app = initializeApp(config);
const auth = getAuth(app);


export function buscarUsuarioAtual() {
    return new Promise ((resolve, reject) =>{
        const usuarioNaoAutenticado = auth.onAuthStateChanged(function(user){
            if(user){
                resolve(user)                
            }else{
                resolve(null)
            }
            usuarioNaoAutenticado()
        })
    })
    
}

export async function loginUser(email: string, senha: string) {
    try {

        const data = await signInWithEmailAndPassword(auth, email, senha);        
        return { success: true, message: 'Login bem sucedido.', data: data};  

    } catch (error) {
        
        let errorMessage = 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.';
        if (error instanceof Error && error.message.includes('auth/user-not-found')) {
            errorMessage = 'Usuário não encontrado. Por favor, verifique suas credenciais.';
        } else if (error instanceof Error && error.message.includes('auth/wrong-password')) {
            errorMessage = 'Senha incorreta. Por favor, tente novamente.';
        }
        
        return { success: false, message: errorMessage};
    }
}

export async function registerUser(email: string, password: string){
    try {

        const data = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, message: 'Usuário registrado com sucesso. Redirecionando ...', data};

    } catch (error) {
        
        let errorMessage = 'Ocorreu um erro durante o registro. Por favor, tente novamente.';
        if (error instanceof Error && error.message.includes('auth/email-already-in-use')) {
            errorMessage = 'Este e-mail já está em uso por outra conta.';
        } else if (error instanceof Error && error.message.includes('auth/weak-password')) {
            errorMessage = 'A senha é muito fraca. Por favor, escolha uma senha mais forte.';
        }
        
        return { success: false, message: errorMessage };
    }
}

export function logoutUser(){
    return auth.signOut();          
}