import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventNamePipe'
})
export class EventNamePipePipe implements PipeTransform {

  transform(value: string, maxlen: number = 35): string {

  	if (value.length < maxlen){
  		return value;
  	}

  	while(value.lastIndexOf(" ") > maxlen-3 ){
  		value = value.slice(0, value.lastIndexOf(" ") )
  	}
    return value + "...";
  }

}
