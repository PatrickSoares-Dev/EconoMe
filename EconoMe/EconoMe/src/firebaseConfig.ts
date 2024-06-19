import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { API_URL } from './config'; // Importar a URL da API

const config = {
    apiKey: "AIzaSyAoUPIZkiRXKuxIcamm7d1-TJCSueErSSQ",
    authDomain: "econome-a7c35.firebaseapp.com",
    projectId: "econome-a7c35",
    storageBucket: "econome-a7c35.appspot.com",
    messagingSenderId: "279961740036",
    appId: "1:279961740036:web:b79e54543c84ff3675a651",
    measurementId: "G-WDWDN6Z9SM"
};

const app = initializeApp(config);
const auth = getAuth(app);

export function buscarUsuarioAtual() {
    return new Promise((resolve, reject) => {
        const usuarioNaoAutenticado = auth.onAuthStateChanged(function(user) {
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
            usuarioNaoAutenticado();
        });
    });
}

export function isUserLoggedIn() {
    const token = localStorage.getItem('token');
    const firebaseUID = localStorage.getItem('firebaseUID');
    return token !== null && firebaseUID !== null;
}

export async function loginUser(email: string, senha: string) {
    try {
        const data = await signInWithEmailAndPassword(auth, email, senha);
        const token = await data.user.getIdToken(); // Obter o token JWT
        
        // Armazenar o token no Local Storage
        localStorage.setItem('token', token);
        localStorage.setItem('firebaseUID', data.user.uid ?? '');

        return { success: true, message: 'Login bem sucedido.', data: data, token: token };  
    } catch (error) {
        let errorMessage = 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.';
        if (error instanceof Error && error.message.includes('auth/user-not-found')) {
            errorMessage = 'Usuário não encontrado. Por favor, verifique suas credenciais.';
        } else if (error instanceof Error && error.message.includes('auth/wrong-password')) {
            errorMessage = 'Senha incorreta. Por favor, tente novamente.';
        }
        return { success: false, message: errorMessage };
    }
}

export async function registerUser(email: string, password: string, nome: string, cpf: string) {
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUID = data.user.uid;

        // Chamar o endpoint da API para registrar o usuário no banco de dados
        const usuario = {
            firebaseUID: firebaseUID,
            nome: nome,
        };

        const response = await fetch(`${API_URL}/Usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            // Se o registro no banco de dados falhar, excluir o usuário do Firebase
            await deleteUser(data.user);
            throw new Error('Erro ao registrar usuário no banco de dados.');
        }

        const token = await data.user.getIdToken();
        localStorage.setItem('token', token);
        localStorage.setItem('firebaseUID', firebaseUID);

        return { success: true, message: 'Usuário registrado com sucesso. Redirecionando ...', data };
    } catch (error) {
        let errorMessage = 'Ocorreu um erro durante o registro. Por favor, tente novamente.';
        if (error instanceof Error && error.message.includes('auth/email-already-in-use')) {
            errorMessage = 'Este e-mail já está em uso por outra conta.';
        } else if (error instanceof Error && error.message.includes('auth/weak-password')) {
            errorMessage = 'A senha é muito fraca. Por favor, escolha uma senha mais forte.';
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { success: false, message: errorMessage };
    }
}

export function logoutUser() {
    // Remover o token e o Firebase UID do Local Storage
    localStorage.removeItem('token');
    localStorage.removeItem('firebaseUID');

    return auth.signOut();
}