import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'anchorImagesPipe'})
export class AnchorImagesPipe implements PipeTransform {
  transform(value: string): string {
    var output = "";
    var sArray = value.split(",");

    for (var i=0; i<sArray.length; i++) {
    	output = output + "<a target='_blank' href='" + sArray[i] + "'>" + "IMAGE_" + (i+1) + "</a>&nbsp;&nbsp;";
    }
    return output;
  }
}
