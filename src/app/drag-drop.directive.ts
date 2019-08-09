import { Input, Output, HostBinding, HostListener, EventEmitter, Directive } from '@angular/core';

@Directive({
    selector: '[appDragDrop]'
})

export class DragDropDirective {
    @Output() fileDropped = new EventEmitter();
    @HostBinding('style.background-color') private background = 'transparent';
    @HostBinding('style.opacity') private opacity = 1;
    @HostBinding('style.color') private color = 'black';

    @HostListener('dragover', ['$event']) ondragover(evt) {
        evt.preventDefault();
        this.background = '#212121';
        this.opacity = 1;
        this.color = '#fafafa';
    }

    @HostListener('dragleave', ['$event']) public ondragleave(evt) {
        evt.preventDefault();
        this.background = 'transparent';
        this.opacity = 1;
        this.color = 'black';
    }

    @HostListener('drop', ['$event']) public ondrop(evt) {
        evt.preventDefault();
        this.background = 'black';
        this.opacity = 1;
        this.color = 'white';
        const files = evt.dataTransfer.files;
        this.fileDropped.emit(files);
        console.log('Dropped Something like...', files);
    }
}
