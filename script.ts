import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

class Joke {
    public setup: string;
    public punchline: string;
    public hide: boolean;

    constructor(setup: string, punchline: string){
        this.setup = setup;
        this.punchline = punchline;
        this.hide = true;
    }

    togle(){
        this.hide = !this.hide;
    }
}

@Component({
    selector: 'joke',
    template: `
        <div class="card card-block">
            <h1 class="card-title">{{data.setup}}</h1>
            <p class="card-text" [hidden]="data.hide" >{{data.punchline}}</p>
            <a class="btn btn-warning" (click)="data.togle()">Tell Me</a>
        </div>
    `
})
class JokeComponent{
    @Input('joke') data: Joke;
}

@Component({
    selector: 'joke-list',
    template: `
        <joke *ngFor="let j of jokes" [joke]="j"></joke>
    `
})
class JokeListComponent{
    jokes: Joke[];

    constructor(){
        this.jokes = [
            new Joke("What did the cheese say when it looked in the mirror?", "Halloumi (hello me)"),
            new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
            new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’")
        ];
    }
}

@Component({
    selector: 'app',
    template: `
        <joke-list></joke-list>
    `
})

class AppComponent {

}

@NgModule({
    imports:[BrowserModule],
    declarations:[
        AppComponent,
        JokeComponent, 
        JokeListComponent
    ],
    bootstrap:[AppComponent]
})
export class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);