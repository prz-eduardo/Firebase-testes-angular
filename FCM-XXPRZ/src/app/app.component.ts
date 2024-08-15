import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, update, onValue } from "firebase/database";

interface Message {
  mensagem: string;
  hora_envio: string;
  app: boolean; // true para usuário, false para sistema
}

const firebaseConfig = {
  apiKey: "AIzaSyBrpS4Hs0h1Q3zDtz-2FtAqr_RYyNiSBrg",
  authDomain: "xxprz-firebase.firebaseapp.com",
  projectId: "xxprz-firebase",
  storageBucket: "xxprz-firebase.appspot.com",
  messagingSenderId: "801987605282",
  appId: "1:801987605282:web:d49e4fd6de539212be6b7b",
  measurementId: "G-5W0FNE7VW4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chat Firebase';

  constructor() {
    console.log('AppComponent constructor called');
  }

  // Função para adicionar uma mensagem a um chat existente
  adicionarMensagem(chatId: string, mensagem: string, enviadoPor: boolean) {
    const messageId = push(ref(db, 'chats/' + chatId + '/messages')).key;
    const horaEnvio = new Date().toISOString(); // Hora atual em formato ISO

    const message: Message = {
      mensagem: mensagem,
      hora_envio: horaEnvio,
      app: enviadoPor
    };

    // Salva a nova mensagem no Firebase
    update(ref(db, 'chats/' + chatId + '/messages/' + messageId), message)
      .then(() => {
        console.log('Mensagem adicionada com sucesso:', message);
      })
      .catch((error) => {
        console.error('Erro ao adicionar mensagem: ', error);
      });
  }

  // Função para buscar um chat pelo ID
  buscarChat(chatId: string) {
    const chatRef = ref(db, 'chats/' + chatId);
    onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log('Dados do chat:', snapshot.val());
      } else {
        console.log('Chat não encontrado.');
      }
    }, (error) => {
      console.error('Erro ao buscar chat: ', error);
    });
  }
}
