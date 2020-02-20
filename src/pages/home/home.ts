import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  teste: String[];
  isRecording = false;
  
  constructor(
    public navCtrl: NavController,
    private speechRecognition: SpeechRecognition,
    private plt: Platform,
    )
    { }

  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

  startListening() {
    let options = {
      language: 'pt-BR',
      matches: 1
    }
    this.speechRecognition.startListening(options)
    .subscribe(
      (matches: Array<string>) => {this.teste = matches;},
      (onerror) => console.log('error:', onerror)
      )
    this.isRecording = true;
  }
}